import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post("login")
  async login(@Body() dto: CreateUserDto) {
    return this.authService.login(dto)
  }

  @Post("registration")
  async registration(@Body() dto: CreateUserDto){
    return this.authService.registration(dto)
  }
}
