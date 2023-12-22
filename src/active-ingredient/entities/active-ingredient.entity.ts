import { Medication } from 'src/medication/entities/medication.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class ActiveIngredient {
  @PrimaryGeneratedColumn()
  ActiveIngredientID: number;

  @Column({ length: 100, nullable: false })
  IngredientName: string;

  //TODO:deside if we need this (we can get it from medication)
  // @Column({ length: 50, nullable: false })
  // Dosage: string;

  @OneToMany(() => Medication, (medication) => medication.ActiveIngredient)
  Medications: Medication[];
}
