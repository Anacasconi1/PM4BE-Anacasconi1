import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/Categories/entities/category.entity';


@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>
  ){}
  
  async getAllProducts(limit: number, page: number): Promise<Product[]> {
    const products = await this.productRepository.find({relations: {category:true}})
    const response = this.queryParamsLimitPage(limit, page, products)
    return response
  }

  async getProductById (id: string): Promise<Product | string>{
    const product = await this.productRepository.findOne({where: {
      id: id
    }, 
  relations: {
    category: true
  }})
  return product ? product : "No se encontró el producto"
  }
  
  async postSeed(product) {
    const mapped = product.map(async prod=>{
      const finder = await this.productRepository.find({where: {
        name: prod.name
      }, relations:{ 
        category:true
      }}) 
      if(!finder.length){
        const categoryFinder = await this.categoriesRepository.find({where:{ name: prod.category}})
        const categoria = categoryFinder[0]
        await this.categoriesRepository.save(categoryFinder)
        await this.productRepository.save({
          name: prod.name,
          description: prod.description,
          price: prod.price,
          stock: prod.stock,
          category: categoria
        })
        return {message: `Producto ${prod.name} creado con exito`}
      }
      else {
        return {message: `No se puede crear el producto ${prod.name} porque ya existe`}
      }
    })
    return mapped
  }
  
  async createProduct (product): Promise<Product> {
    return await this.productRepository.save(product)
  }
  
  async updateProduct(id: string, productDto) {
    const checkIfProductExist = await this.productRepository.findOne({where: {id:id}})
    if(checkIfProductExist){
      const productUpdated = await this.productRepository.update(id, productDto)
      return {
        message: "El producto fue actualizado con exito",
        productUpdated 
      }
    }
    return {message: "No se encontró el producto"}
  }

  async deleteProduct(id: string){ 
    const checkIfProductExist = await this.productRepository.findOne({where: {id:id}})
    if(checkIfProductExist){
      await this.productRepository.delete(id)
      return {message: "El producto se eliminó con exito"}
    }
    return {message: "No se encontró el producto"}
  }

  queryParamsLimitPage (limit: number, page:number, products: Product[]): Product[]{
    if(!limit){
      limit = 5
    }
    if (!page){
      page = 1
    }
		const start = (page - 1) * limit;
    const end = start + limit
    products = products.slice(start, end);    
    return products
	}
}
