import { config } from '@server/config'
import { DataSource, DataSourceOptions } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: config.database.host,
  port: +config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  namingStrategy: new SnakeNamingStrategy(),
  entities: ['@server/**/*.entity.ts'],
  migrations: ['@server/database/migrations/*.ts'],
  logging: config.server.nodeEnv === 'local',
}

const dataSource = new DataSource(dataSourceOptions)

export default dataSource
