import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';



@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @Get(':id')
  async getOrder(@Param('id') id){
    return await this.ordersService.getOrder(id)
  }

  @Post()
  async addOrder(@Body() order){
    const response = await this.ordersService.addOrder(order)
    return response
  }
}
