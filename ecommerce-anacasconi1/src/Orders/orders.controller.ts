import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from 'src/guards/Auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @Get(':id')
  @UseGuards(AuthGuard)
  async getOrder(@Param('id', ParseUUIDPipe) id){
    return await this.ordersService.getOrder(id)
  }

  @Post()
  @UseGuards(AuthGuard)
  async addOrder(@Body() order){
    const response = await this.ordersService.addOrder(order)
    return response
  }
}
