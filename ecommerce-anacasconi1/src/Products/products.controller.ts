import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll() {
    return await this.productsService.getAllProducts();
  }

  @Post()
  async createProduct(@Body() product){
    return await this.productsService.createProduct(product)
  }

  @Post('/seeder')
  async Seeder(@Body() product){
    return await this.productsService.postSeed(product)
  }

}
