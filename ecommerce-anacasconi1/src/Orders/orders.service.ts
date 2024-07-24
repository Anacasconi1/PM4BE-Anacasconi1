import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import {  MoreThan, Repository } from 'typeorm';
import { OrderDetails } from 'src/Orders/entities/orderDetails.entity';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/Product.entity';
import { In } from 'typeorm';

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
    private productsRepository: Repository<Product>,
  ) {}

  async addOrder(order) {
    const id = order.user;
    const productsId = order.products;
    const prod = productsId.map((prodid) => prodid.id);
    const allProdsById = await this.productsRepository.find({
      where: { id: In(prod), stock: MoreThan(0) },
    });

    allProdsById.map(async prod => {
      await this.productsRepository.save({stock: prod.stock -1,  ...prod})
      console.log("se cambio el stock");
      
    })
    
    const userid = await this.userRepository.findOne({ where: { id: id } });
    const price = await allProdsById.map((product) => product.price);
    const detailPrice = price.reduce(
      (acum, current) => Number(acum) + Number(current),
      0,
    );
    const date = new Date().toLocaleString();
    const detail = {
      price: detailPrice,
      products: allProdsById,
      
    };
    const orderDetails = await this.orderDetailsRepository.save(detail)
    const neworder = this.ordersRepository.create({
      user: userid,
      date,
      orderDetails
    });
    
    const response = await this.ordersRepository.save(neworder);
    return response;
  }

  async getOrder(id){
    const order = await this.ordersRepository.findOne({where: {id: id}})
    return order
  }
}
