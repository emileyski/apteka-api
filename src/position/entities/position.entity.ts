import { Employee } from 'src/employee/entities/employee.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Position {
  @PrimaryGeneratedColumn()
  PositionID: number;

  @Column({ length: 100, nullable: false })
  PositionName: string;

  @OneToMany(() => Employee, (employee) => employee.Position)
  Employees: Employee[];
}
