import { IsString, IsNumber, IsOptional, Min, IsArray } from 'class-validator';
import { CreateProductVariantDto } from './create-product-variant.dto';
import { CreateProductImageDto } from './create-product-image.dto';
export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  sale_price?: number;

  @IsNumber()
  @Min(0)
  stock_quantity: number;

  @IsString()
  @IsOptional()
  brand?: string;

  @IsNumber()
  category_id: number;

  @IsArray()
  @IsOptional()
  variants?: CreateProductVariantDto[];

  @IsArray()
  @IsOptional()
  images?: CreateProductImageDto[];
}
