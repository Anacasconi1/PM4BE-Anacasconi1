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
  async addCategory(category: Category) {
    await this.categoriesRepository.create(category)
    const response = await this.categoriesRepository.save(category)
    return response
  }

  async getCategories () {
    await this.categoriesRepository.find()
  }

  
}
