import { Module } from '@nestjs/common';
import { JwtModule } from "@nestjs/jwt";

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from "../user/user.module";

import { JwtConfig } from "../config/jwt.config";


@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: JwtConfig.secret,
      signOptions: { expiresIn: '60m' },
    }),
    UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
