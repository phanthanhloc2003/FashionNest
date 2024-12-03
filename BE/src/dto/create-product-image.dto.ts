import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateProductImageDto {
  @IsString()
  image_url: string;

  @IsBoolean()
  @IsOptional()
  is_primary?: boolean;
}
