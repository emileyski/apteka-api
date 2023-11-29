import { Module } from '@nestjs/common';
import { ActiveIngredientService } from './active-ingredient.service';
import { ActiveIngredientController } from './active-ingredient.controller';
import { ActiveIngredient } from './entities/active-ingredient.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ActiveIngredient])],
  controllers: [ActiveIngredientController],
  providers: [ActiveIngredientService],
})
export class ActiveIngredientModule {}
