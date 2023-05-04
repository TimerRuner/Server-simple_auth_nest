import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { RoleService } from "./role.service";

@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}
  @Post("create")
  async createRole(@Body() dto: CreateRoleDto) {
    return this.roleService.create(dto)
  }

  @Get("/:value")
  async getRole(@Param("value") value: string){
    return await this.roleService.get(value)
  }

  @Patch("update/:value")
  async updateRole(@Param("value") value: string, @Body() dto: CreateRoleDto) {
    return this.roleService.update(value, dto)
  }

  @Delete("delete/:value")
  async deleteRole(@Param("value") value: string) {
    return this.roleService.delete(value)
  }
}
