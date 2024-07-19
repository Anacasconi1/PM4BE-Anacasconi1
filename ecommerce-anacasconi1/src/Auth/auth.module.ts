import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersRepository } from 'src/users/users.repository';
import { AuthRepository } from './auth.repository';
import { AuthGuard } from 'src/guards/Auth.guard';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, UsersRepository, AuthRepository, AuthGuard],
})
export class AuthModule {}
