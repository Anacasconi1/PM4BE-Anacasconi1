import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';



@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @Get(':id')
  async getOrder(@Param('id', ParseUUIDPipe) id){
    return await this.ordersService.getOrder(id)
  }

  @Post()
  async addOrder(@Body() order){
    const response = await this.ordersService.addOrder(order)
    return response
  }
}
