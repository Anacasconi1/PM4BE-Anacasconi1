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
  
  async getAllProducts() {
    return await this.productRepository.find({relations: {category:true}})
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

  async createProduct (product) {
    return await this.productRepository.save(product)
  }

}
