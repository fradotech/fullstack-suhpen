import { Module } from '@nestjs/common'
import { CityModule } from './city/city.module'
import { ProvinceModule } from './province/province.module'

@Module({
  imports: [ProvinceModule, CityModule],
  controllers: [],
  providers: [ProvinceModule, CityModule],
})
export class RegionModule {}
