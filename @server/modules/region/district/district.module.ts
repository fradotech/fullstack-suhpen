import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DistrictIndexUsecase } from './infrastructure/district-index.usecase'
import { RegionDistrict } from './infrastructure/district.entity'
import { DistrictService } from './infrastructure/district.service'
import { DistrictCrudController } from './v1/district-crud.controller'
import { DistrictCrudUsecase } from './v1/district-crud.usecase'
import { DistrictSheetController } from './v1/sheet/district-sheet.controller'

@Module({
  imports: [TypeOrmModule.forFeature([RegionDistrict])],
  controllers: [DistrictSheetController, DistrictCrudController],
  providers: [DistrictService, DistrictCrudUsecase, DistrictIndexUsecase],
  exports: [DistrictService],
})
export class DistrictModule {}
