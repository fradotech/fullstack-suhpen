import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common'

export class Exception {
  static entityNotFound(key?: string, value?: string): void {
    throw new NotFoundException(`Data ${key || ''} '${value || ''}' not found`)
  }

  static notFound(message?: string): void {
    throw new NotFoundException(message)
  }

  static badRequest(message?: string): void {
    throw new BadRequestException(message)
  }

  static unauthorized(message?: string): void {
    throw new UnauthorizedException(message)
  }

  static forbidden(message?: string): void {
    throw new ForbiddenException(message)
  }

  static unprocessable(exception?: any, message?: string): void {
    let sqlMessage: string
    let indexValue: number

    switch (exception?.code) {
      case 'ER_DUP_ENTRY':
        sqlMessage = exception.sqlMessage.replace('Duplicate entry ', '')
        indexValue = sqlMessage.indexOf(' ') - 1
        message = sqlMessage.slice(1, indexValue) + ' has been used'

        throw new UnprocessableEntityException(message)

      // CONTINUE: another case
      // case 'ER_DUP_ENTRY':
    }

    // eslint-disable-next-line
    console.log(exception)

    throw new UnprocessableEntityException(message)
  }
}
