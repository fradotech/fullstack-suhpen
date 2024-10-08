import { applyDecorators, Type } from '@nestjs/common'
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger'

export const ApiSuccessResponse = <TModel extends Type<unknown>>(
  model: TModel,
  isArray = false,
): any => {
  let ref: { $ref?: string; type?: string; items?: { $ref: string } }
  ref = model && { $ref: getSchemaPath(model) }
  if (isArray) {
    ref = {
      type: 'array',
      items: {
        $ref: getSchemaPath(model),
      },
    }
  }
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          {
            properties: {
              data: ref,
              message: {
                type: 'string',
              },
            },
          },
        ],
      },
    }),
  )
}

export const PaginationSuccessResponse = <TModel extends Type<unknown>>(
  model: TModel,
): any => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          {
            properties: {
              data: {
                properties: {
                  items: {
                    type: 'array',
                    items: {
                      $ref: getSchemaPath(model),
                    },
                  },
                  page: { type: 'number' },
                  per_page: { type: 'number' },
                  total_items: { type: 'number' },
                  total_pages: { type: 'number' },
                  next_page_link: { type: 'string' },
                  previous_page_link: { type: 'string' },
                },
              },
              message: {
                type: 'string',
              },
            },
          },
        ],
      },
    }),
  )
}
