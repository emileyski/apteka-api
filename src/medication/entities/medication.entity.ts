import { ActiveIngredient } from 'src/active-ingredient/entities/active-ingredient.entity';
import { Category } from 'src/category/entities/category.entity';
import { DosageForm } from 'src/dosage-form/entities/dosage-form.entity';
import { Manufacturer } from 'src/manufacturer/entities/manufacturer.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Medication {
  @PrimaryGeneratedColumn()
  MedicationID: number;

  @Column({ length: 100, nullable: false })
  TradeName: string;

  @Column({ type: 'int', nullable: false })
  PackagingQuantity: number;

  @ManyToOne(() => Manufacturer, (manufacturer) => manufacturer.Medications, {
    onDelete: 'CASCADE',
  })
  Manufacturer: Manufacturer;

  @ManyToOne(
    () => ActiveIngredient,
    (activeIngredient) => activeIngredient.Medications,
    { onDelete: 'CASCADE' },
  )
  ActiveIngredient: ActiveIngredient;

  @ManyToOne(() => Category, (category) => category.Medications, {
    onDelete: 'CASCADE',
  })
  Category: Category;

  @ManyToOne(() => DosageForm, (dosageForm) => dosageForm.Medications, {
    onDelete: 'CASCADE',
  })
  DosageForm: DosageForm;
}
