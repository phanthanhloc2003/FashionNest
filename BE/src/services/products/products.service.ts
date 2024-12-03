import { Inject, Injectable } from '@nestjs/common';
import { Category } from 'src/entitys/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('CATEGOTY_REPOSITORY')
    private categoryRepository: Repository<Category>,
  ) {}
  async getCategories(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }
}
