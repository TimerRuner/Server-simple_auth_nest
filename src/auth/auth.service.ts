import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { CreateUserDto } from "../user/dto/create-user.dto";
import { UserService } from "../user/user.service";

import * as bcrypt from "bcryptjs"
import { Users } from "../user/user.model";

@Injectable()
export class AuthService {
  constructor(private usersService: UserService, private jwtService: JwtService) {}
  async login(dto: CreateUserDto) {
    const user = await this.validateUser(dto)
    return this.generateToken(user)
  }

  async registration(dto: CreateUserDto) {
    const user = await this.usersService.getByEmail(dto.email)
    if(user){
      throw new HttpException("Користувач з таким email існує", HttpStatus.BAD_REQUEST)
    }
    const hashPassword = await bcrypt.hash(dto.password, 5)
    const registeredUser = await this.usersService.create({ ...dto, password: hashPassword })
    return registeredUser
  }

  async validateUser(dto: CreateUserDto) {
    const user = await this.usersService.getByEmail(dto.email)
    const equalPassword = await bcrypt.compare(dto.password, user.password)
    if(user && equalPassword) {
      return user
    }
    throw new UnauthorizedException({message: "Uncorrect email and password"})
  }

  async generateToken(user: Users){
    const payload = {email: user.email, id: user.id, roles: user.roles}
    return {
      token: this.jwtService.sign(payload)
    }
  }
}
