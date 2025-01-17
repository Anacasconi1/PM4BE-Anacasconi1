import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from '../guards/Auth.guard';
import { OrderDto } from './dto/create-order.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  async getOrder(@Param('id', ParseUUIDPipe) id:string){
    return await this.ordersService.getOrder(id)
  }
  @ApiBearerAuth()
  @ApiBody({type: OrderDto})
  @Post()
  @UseGuards(AuthGuard)
  async addOrder(@Body() order:OrderDto){
    const response = await this.ordersService.addOrder(order)
    return response
  }

  @ApiBearerAuth()
  @Delete('cancel/:id')
  @UseGuards(AuthGuard)
  async cancelOrder (@Param ('id', ParseUUIDPipe) id: string) {
    return await this.ordersService.cancelOrder(id)
  }
}
