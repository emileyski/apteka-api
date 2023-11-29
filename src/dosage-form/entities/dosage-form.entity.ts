import { Medication } from 'src/medication/entities/medication.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class DosageForm {
  @PrimaryGeneratedColumn()
  DosageFormID: number;

  @Column({ length: 100, nullable: false })
  FormName: string;

  @Column({ length: 50, nullable: false })
  Unit: string;

  @OneToMany(() => Medication, (medication) => medication.DosageForm, {
    onDelete: 'CASCADE',
  })
  Medications: Medication[];
}
