import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('/seeder')
  Seeder(@Body() categories) {
    return this.categoriesService.addCategories(categories);
  }

  @Post()
  create(@Body() category: Category) {
    return this.categoriesService.addCategory(category);
  }
  @Get()
  findAll() {
    return this.categoriesService.getCategories();
  }
}
