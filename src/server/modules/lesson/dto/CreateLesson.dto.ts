import { ArrayMinSize, IsArray, IsInt, IsNotEmpty, IsString, Max, Min, MinLength, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { CreateStageDto } from './CreateStage.dto'
import { UniqueStagesNums } from './validators/StagesNum.validator'
import { UniqueLessonNum } from "~server/modules/lesson/dto/validators/UniqueLessonNum.validator";
import { UniqueLessonTheme } from "~server/modules/lesson/dto/validators/UniqueLessonTheme.validator";

export class CreateLessonDto {
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(1000)
  @UniqueLessonNum()
  readonly num: number

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @UniqueLessonTheme()
  readonly theme: string

  @IsString()
  readonly theory: string

  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  readonly tooltips: string[]

  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(3)
  @ValidateNested({ each: true })
  @Type(() => CreateStageDto)
  @UniqueStagesNums()
  readonly stages: CreateStageDto[]
}
