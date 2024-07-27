import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from 'src/guards/Auth.guard';
import { OrderDto } from './dto/create-order.dto';
import { TransformUsers } from 'src/interceptors/separatePassword';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @Get(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(TransformUsers)
  async getOrder(@Param('id', ParseUUIDPipe) id){
    return await this.ordersService.getOrder(id)
  }

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(TransformUsers)
  async addOrder(@Body() order:OrderDto){
    const response = await this.ordersService.addOrder(order)
    return response
  }
}
