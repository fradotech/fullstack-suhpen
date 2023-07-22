import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { Response } from 'express'
import { EntityNotFoundError, QueryFailedError } from 'typeorm'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = exception.getStatus()

    if (exception instanceof UnprocessableEntityException) {
      const exceptionResponse = exception.getResponse()
      const data = exceptionResponse['data'] ?? null

      response.status(status).json({
        message: exceptionResponse['message'],
        errors: data,
      })
      return
    }

    response.status(status).json({
      message: exception.getResponse()['message'],
      errors: exception.getResponse()['error'],
    })
  }
}

@Catch(EntityNotFoundError)
export class EntityNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = 404

    const indexValue = exception.message.indexOf('{')
    const query = JSON.parse(exception.message.slice(indexValue, -1) + '}')
    const message = `Data ${Object.keys(query)[0]} = '${
      Object.values(query)[0]
    }' not found`

    response.status(status).json({ message, data: exception })
  }
}

@Catch(QueryFailedError)
export class QueryErrorFilter extends BaseExceptionFilter {
  public catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    let message: string

    switch (exception.code) {
      case '23502':
        message = `${exception.column} should not be empty`
        response.status(409).json({ message, data: exception })
        break

      case '23505':
        message = exception.detail
        response.status(409).json({ message, data: exception })
        break

      default:
        Logger.error(exception, QueryFailedError.name)

        response.status(422).json({
          message: String(exception),
          data: exception,
        })
    }
  }
}
