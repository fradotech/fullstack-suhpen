import { config } from '@server/config'
import { DataSource, DataSourceOptions } from 'typeorm'
import snakeNamingStrategy from './common/snake-naming.strategy'

const isRunning = process.argv[2]

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: config.database.host,
  port: +config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  namingStrategy: snakeNamingStrategy,
  logging: config.server.nodeEnv === 'local',
  entities: isRunning ? ['@server/**/*.entity.ts'] : ['dist/**/*.entity.js'],
  migrations: isRunning
    ? ['@server/database/migrations/*.ts']
    : ['dist/@server/database/migrations/*.js'],
  cache: {
    duration: config.cache.register.ttl,
    type: config.cache.redis.host && !isRunning ? 'redis' : undefined,
    options: !isRunning ? config.cache.redis : undefined,
  },
}

const dataSource = new DataSource(dataSourceOptions)

export default dataSource
