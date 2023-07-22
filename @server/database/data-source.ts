import { config } from '@server/config'
import { DataSource, DataSourceOptions } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

const isRunning = process.argv[2]

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: config.database.host,
  port: +config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  namingStrategy: new SnakeNamingStrategy(),
  logging: config.server.nodeEnv === 'local',
  entities: isRunning ? ['@server/**/*.entity.ts'] : ['dist/**/*.entity.js'],
  migrations: isRunning
    ? ['@server/database/migrations/*.ts']
    : ['dist/@server/database/migrations/*.js'],
  cache: {
    duration: config.cache.register.ttl,
    type: config.cache.redis.host ? 'redis' : undefined,
    options: config.cache.redis,
  },
}

const dataSource = new DataSource(dataSourceOptions)

export default dataSource
