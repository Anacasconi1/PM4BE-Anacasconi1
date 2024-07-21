import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthGuard } from 'src/guards/Auth.guard';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
})
export class AuthModule {}
