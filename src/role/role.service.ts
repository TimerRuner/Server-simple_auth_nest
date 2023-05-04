import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Roles } from "./roles.model";
import { CreateRoleDto } from "./dto/create-role.dto";

@Injectable()
export class RoleService {
  constructor(@InjectModel(Roles) private readonly roleRepository: typeof Roles) {}

  async create(dto: CreateRoleDto) {
    return await this.roleRepository.create(dto)
  }

  async get(value: string) {
    const role = await this.roleRepository.findOne({where: { value }})
    if(!role) {
      throw new NotFoundException(`Role ${value} not found`);
    }
    return role
  }

  async update(value: string, dto: CreateRoleDto) {
    const [rowsAffected, [updatedRecord]] = await this.roleRepository.update(dto,{where: {value}, returning: true})
    if (rowsAffected === 0) {
      throw new NotFoundException(`Role ${value} not found`);
    }
    return updatedRecord;
  }

  async delete(value: string) {
    const deletedRow = await this.roleRepository.destroy({ where: {value} })
    if (deletedRow === 0) {
      throw new NotFoundException(`Role ${value} not found`);
    }
    return `Role ${value} deleted successfully`
  }
}
