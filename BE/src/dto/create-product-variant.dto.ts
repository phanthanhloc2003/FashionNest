import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateProductVariantDto {
  @IsString()
  @IsOptional()
  size?: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsString()
  sku: string;

  @IsNumber()
  @Min(0)
  stock_quantity: number;

  @IsNumber()
  @IsOptional()
  price_adjustment?: number;
}
