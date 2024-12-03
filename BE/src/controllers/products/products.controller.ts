import { Controller, Get } from '@nestjs/common';
import { Category } from 'src/entitys/category.entity';
import { ProductsService } from 'src/services/products/products.service';
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Get('categories')
  async getCategories(): Promise<Category[]> {
    return await this.productsService.getCategories();
  }
}
