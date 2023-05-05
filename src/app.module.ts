import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import {ConfigModule} from "@nestjs/config";
import {SequelizeModule} from "@nestjs/sequelize";
import { UserRoles } from "./role/user-roles.model";
import { Roles } from "./role/roles.model";
import { Users } from "./user/user.model";


@Module({
  imports: [
      ConfigModule.forRoot({
          envFilePath: ".env"
      }),
      SequelizeModule.forRoot({
          dialect: 'postgres',
          host: process.env.POSTGRES_HOST,
          port: Number(process.env.POSTGRES_PORT),
          username: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DB,
          models: [Users, Roles, UserRoles],
          autoLoadModels: true
      }),
      AuthModule,
      UserModule,
      RoleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
