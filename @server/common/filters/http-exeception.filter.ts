import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  UnprocessableEntityException,
} from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { Response } from 'express'
import {
  EntityNotFoundError,
  FindRelationsNotFoundError,
  QueryFailedError,
} from 'typeorm'

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
    const { where } = JSON.parse(exception.message.slice(indexValue, -1) + '}')
    const message = `Data ${Object.keys(where)[0]} = '${
      Object.values(where)[0]
    }' not found`

    response.status(status).json({
      message,
      data: null,
    })
  }
}

@Catch(FindRelationsNotFoundError)
export class RelationNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: FindRelationsNotFoundError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = 404

    response.status(status).json({
      message: 'Relation data not found',
      data: null,
    })
  }
}

@Catch(QueryFailedError)
export class QueryErrorFilter extends BaseExceptionFilter {
  public catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    switch (exception.code) {
      case 'ER_DUP_ENTRY':
        const sqlMessage = exception.sqlMessage.replace('Duplicate entry ', '')
        const indexValue = sqlMessage.indexOf(' ') - 1
        const message = sqlMessage.slice(1, indexValue) + ' has been used'

        response.status(409).json({
          message,
          data: null,
        })
        break

      default:
        response.status(422).json({
          message: String(exception),
          data: null,
        })
    }
  }
}
