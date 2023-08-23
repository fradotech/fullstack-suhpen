import { Util } from '@server/common/utils/util'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

const snakeNamingStrategy = new SnakeNamingStrategy()
snakeNamingStrategy.tableName = (className: string, customName: string) => {
  if (customName) return customName
  const result = Util.camelToSnake(className) + 's'
  if (result.slice(-2) === 'ys') return result.slice(0, -2) + 'ies'
  return result
}

export default snakeNamingStrategy
