import { Product } from 'src/entitys/product.entity';
import { DataSource } from 'typeorm';

export const ProductProviders = [
  {
    provide: 'PRODUCT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Product),
    inject: ['DATA_SOURCE'],
  },
];
