import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';


@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ){}
  
  async getAllProducts() {
    return await this.productRepository.find()
  }

  async createProduct (product) {
    return await this.productRepository.save(product)
  }

}
