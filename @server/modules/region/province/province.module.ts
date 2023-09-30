import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProvinceIndexUsecase } from './infrastructure/province-index.usecase'
import { RegionProvince } from './infrastructure/province.entity'
import { ProvinceService } from './infrastructure/province.service'
import { ProvinceCrudController } from './v1/province-crud.controller'
import { ProvinceCrudUsecase } from './v1/province-crud.usecase'
import { ProvinceSheetController } from './v1/sheet/province-sheet.controller'

@Module({
  imports: [TypeOrmModule.forFeature([RegionProvince])],
  controllers: [ProvinceSheetController, ProvinceCrudController],
  providers: [ProvinceService, ProvinceCrudUsecase, ProvinceIndexUsecase],
  exports: [ProvinceService],
})
export class ProvinceModule {}
