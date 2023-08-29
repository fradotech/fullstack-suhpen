import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DistrictIndexApp } from './infrastructure/district-index.app'
import { RegionDistrict } from './infrastructure/district.entity'
import { DistrictService } from './infrastructure/district.service'
import { DistrictCrudApp } from './v1/district-crud.app'
import { DistrictCrudController } from './v1/district-crud.controller'
import { DistrictSheetController } from './v1/sheet/district-sheet.controller'

@Module({
  imports: [TypeOrmModule.forFeature([RegionDistrict])],
  controllers: [DistrictSheetController, DistrictCrudController],
  providers: [DistrictService, DistrictCrudApp, DistrictIndexApp],
  exports: [DistrictService],
})
export class DistrictModule {}
