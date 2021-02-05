import { ArrayMinSize, IsArray, IsInt, IsNotEmpty, IsString, Max, Min, MinLength, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { CreateStageDto } from './CreateStage.dto'
import { UniqueStagesNums } from './StagesNum.validator'

export class CreateLessonDto {
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(1000)
  readonly num: number

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  readonly theme: string

  @IsString()
  readonly theory: string

  @IsArray()
  readonly tooltips: string[]

  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateStageDto)
  @UniqueStagesNums()
  readonly stages: CreateStageDto[]
}
