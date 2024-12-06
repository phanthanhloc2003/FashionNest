import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { CreateProductDto } from 'src/dto/create-product.dto';
import { Category } from 'src/entitys/category.entity';
import { Product } from 'src/entitys/product.entity';
import { RolesGuard } from 'src/guard/roles.guard';
import { ProductsService } from 'src/services/products/products.service';
import { Role } from 'src/types/role.enum';
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Get('categories')
  async getCategories(): Promise<Category[]> {
    return await this.productsService.getCategories();
  }

  @Post()
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  async createProduct(@Body() body: CreateProductDto) {
    return await this.productsService.create(body);
  }

  @Get()
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  async getAllproduct(): Promise<Product[]> {
    return await this.productsService.getProduct();
  }
}
