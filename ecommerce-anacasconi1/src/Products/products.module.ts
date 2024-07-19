import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { AuthGuard } from 'src/guards/Auth.guard';
import { AuthRepository } from 'src/auth/auth.repository';
import { UsersRepository } from 'src/users/users.repository';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository, AuthGuard, AuthRepository, UsersRepository],
})
export class ProductsModule {}
