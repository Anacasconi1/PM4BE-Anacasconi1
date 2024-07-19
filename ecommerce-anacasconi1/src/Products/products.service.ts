import { Injectable } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor( private productsRepository: ProductsRepository){}
  create(ProductDto: ProductDto) {
    const newProduct = this.productsRepository.createProducts(ProductDto)
    return newProduct;
  }

  findAll() {
    const products = this.productsRepository.getProducts();
    return products
  }

  findOneById(id: number) {
    const product = this.productsRepository.getProductsById(id)
    return product
  }

  update(id: number, ProductDto: ProductDto) {
    const updatedProductId = this.productsRepository.updateProduct(ProductDto, id)
    return {
      message: "Producto actualizado con exito",
      updatedProductId
    }
  }

  remove(id: number) {
    const removedProductId = this.productsRepository.removeProduct(id)
    return {
      message: "Producto eliminado con exito",
      removedProductId
    }
  }
  queryParamsLimitPage (limit: string, page:string){
		this.productsRepository.queryParamsLimitAndPage(limit, page)
	}
}