import { Employee } from 'src/employee/entities/employee.entity';
import { OrderItem } from 'src/sale/entities/order-item.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  SaleID: number;

  @ManyToOne(() => Employee, { onDelete: 'CASCADE' })
  Employee: Employee;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  TotalPrice: number;

  @Column({ type: 'date', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  SaleDate: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.Sale, {
    onDelete: 'CASCADE',
  })
  OrderItems: OrderItem[];
}
