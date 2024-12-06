import { ProductVariant } from 'src/entitys/product-variant.entity';
import { DataSource } from 'typeorm';

export const productVariantProviders = [
  {
    provide: 'PRODUCTVARIANT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ProductVariant),
    inject: ['DATA_SOURCE'],
  },
];
