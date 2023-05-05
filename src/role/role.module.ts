import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { Roles } from "./roles.model";
import { Users } from "../user/user.model";
import { UserRoles } from "./user-roles.model";

@Module({
  controllers: [RoleController],
  providers: [RoleService],
  imports: [
    SequelizeModule.forFeature([Roles, Users, UserRoles])
  ],
  exports: [RoleService]
})
export class RoleModule {}
