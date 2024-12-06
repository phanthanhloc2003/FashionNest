import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Category } from './category.entity';

import { ProductImage } from './product-image.entity';
import { ProductVariant } from './product-variant.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Category, (Category) => Category.id)
  category_id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  sale_price: number;

  @Column({ type: 'int', default: 0 })
  stock_quantity: number;

  @Column({ length: 100, nullable: true })
  brand: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => ProductVariant, (variant) => variant.product)
  variants: ProductVariant[];

  @OneToMany(() => ProductImage, (image) => image.product)
  images: ProductImage[];
}
