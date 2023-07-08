import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { dataSourceOptions } from './data-source'
import { SeederMoodule } from './seeder/seeder.module'

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), SeederMoodule.forRoot()],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
