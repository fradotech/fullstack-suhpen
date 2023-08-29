import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProvinceIndexApp } from './infrastructure/province-index.app'
import { RegionProvince } from './infrastructure/province.entity'
import { ProvinceService } from './infrastructure/province.service'
import { ProvinceCrudApp } from './v1/province-crud.app'
import { ProvinceCrudController } from './v1/province-crud.controller'
import { ProvinceSheetController } from './v1/sheet/province-sheet.controller'

@Module({
  imports: [TypeOrmModule.forFeature([RegionProvince])],
  controllers: [ProvinceSheetController, ProvinceCrudController],
  providers: [ProvinceService, ProvinceCrudApp, ProvinceIndexApp],
  exports: [ProvinceService],
})
export class ProvinceModule {}
