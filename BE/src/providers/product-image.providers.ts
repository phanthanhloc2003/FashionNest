import { ProductImage } from 'src/entitys/product-image.entity';
import { DataSource } from 'typeorm';

export const ProductImageProviders = [
  {
    provide: 'PRODUCTIMAGE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ProductImage),
    inject: ['DATA_SOURCE'],
  },
];
