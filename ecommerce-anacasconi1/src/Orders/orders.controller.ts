import { Body, Controller, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';



@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  
  @Post()
  async addOrder(@Body() userId: string, products: []){
    const response = await this.ordersService.addOrder(userId, products)
    return response
  }
}
