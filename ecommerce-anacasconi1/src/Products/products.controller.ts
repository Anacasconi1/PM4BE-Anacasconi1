import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,

} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/Product.entity';
import { AuthGuard } from 'src/guards/Auth.guard';
import { RolesGuard } from 'src/guards/Role.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(
    @Query('limit') limit?: string,
    @Query('page') page?: string,
  ): Promise<Product[]> {
    return await this.productsService.getAllProducts(
      Number(limit),
      Number(page),
    );
  }

  @Post()
  async createProduct(@Body() product): Promise<Product> {
    return await this.productsService.createProduct(product);
  }

  @Post('/seeder')
  async Seeder(@Body() product) {
    return await this.productsService.postSeed(product);
  }

  @Put(':id')
  @UseGuards(AuthGuard, RolesGuard)
  async UpdateProduct(@Param('id', ParseUUIDPipe) id: string, ProductDto) {
    const ProductUpdated = await this.productsService.updateProduct(
      id,
      ProductDto,
    );
    return ProductUpdated;
  }

  @Delete(':id')
  async deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
    const productDeleted = await this.productsService.deleteProduct(id);
    return productDeleted;
  }

  @Get(':id')
  async GetProductById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Product | string> {
    const productFinder = await this.productsService.getProductById(id);
    return productFinder;
  }
}
