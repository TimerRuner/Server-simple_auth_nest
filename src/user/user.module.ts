import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from "@nestjs/sequelize";
import { Roles } from "../role/roles.model";
import { Users } from "./user.model";
import { UserRoles } from "../role/user-roles.model";
import { RoleModule } from "../role/role.module";

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    SequelizeModule.forFeature([Roles, Users, UserRoles]),
    RoleModule
  ],
  exports: [UserService]
})
export class UserModule {}
