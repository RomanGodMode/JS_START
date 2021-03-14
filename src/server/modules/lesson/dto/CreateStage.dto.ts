import { IsInt, IsNotEmpty, IsString, Max, MaxLength, Min, MinLength } from 'class-validator'

export class CreateStageDto {
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(15)
  readonly num: number

  @IsString()
  @MaxLength(13)
  readonly title: string

  @IsString()
  @MinLength(11)
  readonly task: string

  @IsString()
  @MinLength(1)
  readonly answer: string
}
