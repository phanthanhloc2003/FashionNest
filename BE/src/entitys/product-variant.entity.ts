import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from './product.entity';

@Entity('product_variants')
export class ProductVariant {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.variants, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @Column({ length: 20, nullable: true })
  size: string;

  @Column({ length: 50, nullable: true })
  color: string;

  @Column({ length: 100, unique: true })
  sku: string;

  @Column({ type: 'int', default: 0 })
  stock_quantity: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  price_adjustment: number;
}
