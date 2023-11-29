import { Sale } from 'src/sale/entities/sale.entity';
import { Supply } from 'src/supply/entities/supply.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  OrderID: number;

  @ManyToOne(() => Sale, { onDelete: 'CASCADE' })
  Sale: Sale;

  @ManyToOne(() => Supply, { onDelete: 'CASCADE' })
  Supply: Supply;

  @Column({ type: 'int', nullable: false })
  Quantity: number;
}
