import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { AuthGuard } from "../auth/jwt-auth.guard";
import { Roles } from "../auth/role.decorator";
import { RolesGuard } from "../auth/role.guard";

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post("create")
  async createUser(@Body() dto: CreateUserDto) {
    return await this.userService.create(dto)
  }

  @UseGuards(AuthGuard)
  @Get()
  async getAll(){
    return this.userService.getAll()
  }

  @Get(":email")
  async getUserByEmail(@Param("email") email: string) {
    return this.userService.getByEmail(email)
  }

  @Patch("update/:id")
  async updateUser(@Param("id") id: number, @Body() dto: CreateUserDto) {
    return this.userService.updateUser(id, dto)
  }

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Patch("add-role/:id")
  async addUserRole(@Param("id") id: number, @Body() dto: UpdateRoleDto) {
    return this.userService.addRole(id, dto)
  }

  @Delete("delete/:id")
  async deleteUser(@Param("id") id: string) {
    return this.userService.delete(id)
  }
}
