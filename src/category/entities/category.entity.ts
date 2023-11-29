import { Medication } from 'src/medication/entities/medication.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  CategoryID: number;

  @Column({ length: 100, nullable: false })
  CategoryName: string;

  @OneToMany(() => Medication, (medication) => medication.Category)
  Medications: Medication[];
}
