import { Position } from 'src/position/entities/position.entity';
import { Sale } from 'src/sale/entities/sale.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  EmployeeID: number;

  @Column({ length: 50, nullable: false })
  Email: string;

  @Column({ length: 50, nullable: false })
  Password: string;

  @Column({ length: 100, nullable: false })
  FullName: string;

  @Column({ type: 'date', nullable: false })
  BirthDate: Date;

  @Column({ nullable: true })
  Token?: string;

  @ManyToOne(() => Position, (position) => position.Employees, {
    onDelete: 'CASCADE',
  })
  Position: Position;

  @Column({ length: 255, nullable: true })
  ResidenceAddress: string;

  @Column({ length: 20, nullable: true })
  PhoneNumber: string;

  @OneToMany(() => Sale, (sale) => sale.Employee, {
    onDelete: 'CASCADE',
  })
  Sales: Sale[];
}
