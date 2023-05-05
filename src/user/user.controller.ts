import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";
import { UpdateRoleDto } from "./dto/update-role.dto";

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post("create")
  async createUser(@Body() dto: CreateUserDto) {
    return await this.userService.create(dto)
  }

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

  @Patch("add-role/:id")
  async addUserRole(@Param("id") id: number, @Body() dto: UpdateRoleDto) {
    return this.userService.addRole(id, dto)
  }

  @Delete("delete/:id")
  async deleteUser(@Param("id") id: string) {
    return this.userService.delete(id)
  }
}
