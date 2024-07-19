import { Controller, Get, Put, Post, Delete, Param, Body, HttpCode, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/product.dto';
import { AuthGuard } from 'src/guards/Auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  
  @HttpCode(200)
  @Get()
  findAll(@Query('page') page?:string, @Query('limit') limit?: string) {
    this.productsService.queryParamsLimitPage(Number(limit), Number(page))
    return this.productsService.findAll(Number(limit), Number(page));
  }

  @HttpCode(201)
  @Post()
  @UseGuards(AuthGuard)
  create(@Body() ProductDto: ProductDto) {
    const newProduct = this.productsService.create(ProductDto);
    return newProduct
  }

  @HttpCode(200)
  @Put(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() ProductDto: ProductDto) {
    const productUpdatedId = this.productsService.update(Number(id), ProductDto);
    return productUpdatedId
  }
  
  @HttpCode(200)
  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    const productRemovedId = this.productsService.remove(Number(id));
    return productRemovedId
  }

  @HttpCode(200)
  @Get(':id')
  findOne(@Param('id') id: string) {
    const user = this.productsService.findOneById(Number(id));
    return user 
  }
}
