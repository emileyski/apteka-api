import { Medication } from 'src/medication/entities/medication.entity';
import { OrderItem } from 'src/sale/entities/order-item.entity';
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

  @Column({ type: 'int', nullable: false })
  CurrentQuantity: number;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  SupplyDate: Date;

  @Column({ type: 'date', nullable: false })
  ExpiryDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  UnitPrice: number;

  @ManyToOne(() => Medication, (medication) => medication.Supplies, {
    onDelete: 'CASCADE',
  })
  Medication: Medication;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.Supply, {
    onDelete: 'CASCADE',
  })
  OrderItems: OrderItem[];
}
