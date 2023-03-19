import { ApiProperty, OmitType } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Matches } from 'class-validator'
import { ECategoryName } from './category.enum'
import { ICategory } from './category.interface'

class CategoryRequest implements ICategory {
  id: string

  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z ]+$/)
  @ApiProperty({ example: 'Frado' })
  name: ECategoryName
}

export class CategoryCreateRequest extends OmitType(CategoryRequest, []) {}

export class CategoryUpdateRequest extends OmitType(CategoryRequest, []) {}
