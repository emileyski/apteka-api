import { Medication } from 'src/medication/entities/medication.entity';
import { OrderItem } from 'src/order-item/entities/order-item.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Supply {
  @PrimaryGeneratedColumn()
  SupplyID: number;

  @Column({ type: 'int', nullable: false })
  Quantity: number;

  @Column({ type: 'date', default: () => 'GETDATE()' })
  SupplyDate: Date;

  @Column({ type: 'date', nullable: false })
  ExpiryDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  UnitPrice: number;

  @ManyToOne(() => Medication, { onDelete: 'CASCADE' })
  Medication: Medication;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.Supply, {
    onDelete: 'CASCADE',
  })
  OrderItems: OrderItem[];
}
