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
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/@server/database/migrations/*.js'],
  logging: config.server.nodeEnv === 'local',
}

const dataSource = new DataSource(dataSourceOptions)

export default dataSource
