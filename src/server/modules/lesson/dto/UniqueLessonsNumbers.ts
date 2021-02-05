// import {
//   registerDecorator,
//   ValidatorConstraint,
//   ValidationOptions,
//   ValidationArguments,
//   ValidatorConstraintInterface,
// } from 'class-validator'
// import { CreateStageDto } from './CreateStage.dto'
// import { Injectable } from '@nestjs/common'
//
//
// @ValidatorConstraint({ async: true })
// export class StagesUniqueNumsConstraint
//   implements ValidatorConstraintInterface {
//   async validate(stages: CreateStageDto[], args: ValidationArguments) {
//
//     return true
//   }
//   defaultMessage(args: ValidationArguments) {
//     return 'stages nums must be unique'
//   }
// }
//
// //@Injectable()
// export function UniqueLessonsNums(validationOptions?: ValidationOptions) {
//   return function (object: Object, propertyName: string) {
//     registerDecorator({
//       target: object.constructor,
//       propertyName: propertyName,
//       options: validationOptions,
//       constraints: [],
//       validator: StagesUniqueNumsConstraint,
//     })
//   }
// }
