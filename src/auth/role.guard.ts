import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Reflector } from '@nestjs/core';
import { JwtService } from "@nestjs/jwt";
import { ROLE_CONST } from "./role.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>(ROLE_CONST, context.getHandler());
    if (!roles) {
      return true;
    }
    try {
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization
      const bearer = authHeader.split(" ")[0]
      const token = authHeader.split(" ")[1]

      if(bearer !== "Bearer" || !token){
        throw new UnauthorizedException({message: "User is not authorized"})
      }

      const user = this.jwtService.verify(token)
      console.log(user)
      req.user = user
      return user.roles.some(role => roles.includes(role.value))
    } catch (e) {
      throw new UnauthorizedException({message: "User is not authorized"})
    }
  }
}