import { Category } from 'src/entitys/category.entity';
import { DataSource } from 'typeorm';

export const categoryProviders = [
  {
    provide: 'CATEGOTY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Category),
    inject: ['DATA_SOURCE'],
  },
];
