import { Injectable } from '@nestjs/common/decorators'
import { registerDecorator, ValidatorConstraint, ValidationOptions, ValidationArguments, ValidatorConstraintInterface } from 'class-validator'
import { LessonsRepository } from '~server/modules/lesson/service/lessons.repository'



@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueLessonThemeConstraint implements ValidatorConstraintInterface {
  constructor(private readonly lessonsRepository: LessonsRepository) {}

  async validate(theme: string, args: ValidationArguments) {
    return this.lessonsRepository.isUniqueTheme(theme)
  }
  defaultMessage(args: ValidationArguments) {
    return 'lesson theme must be unique'
  }
}

export function UniqueLessonTheme(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UniqueLessonThemeConstraint
    })
  }
}
