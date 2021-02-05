import { registerDecorator, ValidatorConstraint, ValidationOptions, ValidationArguments, ValidatorConstraintInterface } from 'class-validator'
import { CreateStageDto } from './CreateStage.dto'

@ValidatorConstraint({ async: false })
export class StagesUniqueNumsConstraint implements ValidatorConstraintInterface {
  validate(stages: CreateStageDto[], args: ValidationArguments) {
    if (!stages) return false
    const nums: number[] = stages.map(s => s.num)
    const uniqueNums: Set<number> = new Set(nums)
    //Если все номера уникальны -> всё ОК
    return nums.length === uniqueNums.size
  }
  defaultMessage(args: ValidationArguments) {
    return 'stages nums must be unique'
  }
}

export function UniqueStagesNums(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: StagesUniqueNumsConstraint
    })
  }
}
