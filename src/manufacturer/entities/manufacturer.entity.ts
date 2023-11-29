import { Medication } from 'src/medication/entities/medication.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Manufacturer {
  @PrimaryGeneratedColumn()
  ManufacturerID: number;

  @Column({ length: 100, nullable: false })
  ManufacturerName: string;

  @Column({ length: 50, nullable: false })
  Country: string;

  @OneToMany(() => Medication, (medication) => medication.Manufacturer, {
    onDelete: 'CASCADE',
  })
  Medications: Medication[];
}
