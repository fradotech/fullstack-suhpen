import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { config } from '@server/config'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { DataSourceConfig } from './config.db'
import { seeders } from './seeds/seed.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DataSourceConfig.host,
      port: +DataSourceConfig.port,
      username: DataSourceConfig.username,
      password: DataSourceConfig.password,
      database: DataSourceConfig.database,
      autoLoadEntities: true,
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy(),
      logging: config.server.nodeEnv === 'local',
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {
  constructor() {
    seeders()
  }
}
