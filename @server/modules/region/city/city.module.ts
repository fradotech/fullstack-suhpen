import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CityIndexApp } from './infrastructure/city-index.app'
import { RegionCity } from './infrastructure/city.entity'
import { CityService } from './infrastructure/city.service'
import { CityCrudApp } from './v1/city-crud.app'
import { CityCrudController } from './v1/city-crud.controller'
import { CitySheetController } from './v1/sheet/city-sheet.controller'

@Module({
  imports: [TypeOrmModule.forFeature([RegionCity])],
  controllers: [CitySheetController, CityCrudController],
  providers: [CityService, CityCrudApp, CityIndexApp],
  exports: [CityService],
})
export class CityModule {}
