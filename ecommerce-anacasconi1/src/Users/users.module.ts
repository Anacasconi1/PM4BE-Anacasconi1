import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { AuthGuard } from 'src/guards/Auth.guard';
import { AuthRepository } from 'src/auth/auth.repository';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, AuthGuard, AuthRepository],
})
export class UsersModule {}
