import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CityIndexUsecase } from './infrastructure/city-index.usecase'
import { RegionCity } from './infrastructure/city.entity'
import { CityService } from './infrastructure/city.service'
import { CityCrudController } from './v1/city-crud.controller'
import { CityCrudUsecase } from './v1/city-crud.usecase'
import { CitySheetController } from './v1/sheet/city-sheet.controller'

@Module({
  imports: [TypeOrmModule.forFeature([RegionCity])],
  controllers: [CitySheetController, CityCrudController],
  providers: [CityService, CityCrudUsecase, CityIndexUsecase],
  exports: [CityService],
})
export class CityModule {}
