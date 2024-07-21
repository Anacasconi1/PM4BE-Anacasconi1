import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderDetails } from 'src/Orders/entities/orderDetails.entity';
import { User } from 'src/users/entities/user.entity';
// import { OrderDto } from './dto/create-order.dto';
import { Product } from 'src/Products/entities/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(OrderDetails)
    private orderDetailsRepository: Repository<OrderDetails>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>
  ){}
  
  async addOrder(userId, productsid) {
    const productsById = await this.productsRepository.find({where: {id: productsid}})
    const user = await this.userRepository.findOne({where: { id : userId}})
    const price = productsById.map(product => product.price)
    const detailPrice = price.reduce((acum, current)=> Number(acum) + Number(current), 0 )
    const date = new Date().toLocaleString()

    const detail = {
      price: detailPrice,
      products: productsById
    } 

    const orderDetail = await this.orderDetailsRepository.create(detail)
    const order = await this.ordersRepository.create({user, date, ...orderDetail})
    const response = await this.ordersRepository.save(order)
    return response
  }

}
