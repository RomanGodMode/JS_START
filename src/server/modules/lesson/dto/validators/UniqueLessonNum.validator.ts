import { Injectable } from '@nestjs/common/decorators'
import { registerDecorator, ValidatorConstraint, ValidationOptions, ValidationArguments, ValidatorConstraintInterface } from 'class-validator'
import { LessonsRepository } from '~server/modules/lesson/service/lessons.repository'



@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueLessonNumConstraint implements ValidatorConstraintInterface {
  constructor(private readonly lessonsRepository: LessonsRepository) {}

  async validate(num: number, args: ValidationArguments) {
    return this.lessonsRepository.isUniqueNum(num)
  }
  defaultMessage(args: ValidationArguments) {
    return 'lessons num must be unique'
  }
}

export function UniqueLessonNum(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UniqueLessonNumConstraint
    })
  }
}
