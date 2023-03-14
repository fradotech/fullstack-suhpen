import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { dataSourceOptions } from './data-source'
import { seeders } from './seeds/seed.module'

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions)],
  controllers: [],
  providers: [],
})
export class DatabaseModule {
  constructor() {
    seeders()
  }
}
