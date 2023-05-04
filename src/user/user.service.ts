import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Users } from "./user.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { RoleService } from "../role/role.service";
import { Roles } from "../role/roles.model";
import { CreateRoleDto } from "../role/dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";

@Injectable()
export class UserService {
  constructor(@InjectModel(Users) private userRepository: typeof Users, private roleService: RoleService) {}

  async create(dto: CreateUserDto){
    const userRole = await this.roleService.get("USER")
    const user = await this.userRepository.create(dto)

    await user.$add("roles", [userRole.id])
    user.roles = [userRole]
    return user
  }

  async getAll(){
    return await this.userRepository.findAll({include: [Roles]})
  }

  async delete(id) {
    const deletedRow = await this.userRepository.destroy({ where: {id} })
    if (deletedRow === 0) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return `Role ${id} deleted successfully`
  }

  async updateUser(id: number, dto: CreateUserDto) {
    const [rowsAffected, [updatedRecord]] = await this.userRepository.update(dto,{where: {id}, returning: true})
    if (rowsAffected === 0) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return updatedRecord;
  }

  async addRole(id: number, dto: UpdateRoleDto) {
    const customerRole = await this.roleService.get(dto.role)
    if(!customerRole){
      throw new NotFoundException(`Role ${dto.role} not found`);
    }
    const user = await this.userRepository.findOne({where: {id}})
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }

    await user.$add("roles", [customerRole.id])
    const updatedUser = await this.userRepository.findOne({where: {id}, include: [Roles]})
    return updatedUser
  }


}
