import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>
  ){}
  async addCategories({categories}) {
    const mapped = categories.map( async category => {
      const finder = await this.categoriesRepository.find({where: {name: category.name}})
      if(!finder.length) {
        await this.categoriesRepository.save(category)
        return {message: `Se cargó la categoría ${category} correctamente`}
      }
      else {
        return {message: `Retornando la categoria: ${category}`}
      }
    })
    return mapped
  }
  
  async addCategory(category: Category) {
    const newCategory = await this.categoriesRepository.save(category)
    return newCategory
  }

  async getCategories () {
    return await this.categoriesRepository.find()
  }

  
}
