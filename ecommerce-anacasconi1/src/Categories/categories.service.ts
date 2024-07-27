import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import * as seeder from '../helpers/sedder.json';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async addCategories() {
    try {
      seeder.map(async (seed) => {
        const finder = await this.categoriesRepository.findOne({
          where: { name: seed.category },
        });
        if (!finder) {
          await this.categoriesRepository.save({ name: seed.category });
        }
      });
      return { message: 'Se resolvió el seed correctamente' };
    } catch (error) {
      throw new ConflictException('No es posible cargar el seed de categorias')
    }
  }

  async addCategory(category: Category) {
    const newCategory = await this.categoriesRepository.save(category);
    return newCategory;
  }

  async getCategories() {
    return await this.categoriesRepository.find();
  }
}
