import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Product } from 'src/products/entities/Product.entity';
import { OrderDetails } from 'src/Orders/entities/orderDetails.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderDetails, Product, User])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
