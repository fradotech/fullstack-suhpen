import { Module } from '@nestjs/common'
import { CityModule } from './city/city.module'
import { DistrictModule } from './district/district.module'
import { ProvinceModule } from './province/province.module'

@Module({
  imports: [ProvinceModule, CityModule, DistrictModule],
  controllers: [],
  providers: [ProvinceModule, CityModule, DistrictModule],
})
export class RegionModule {}
