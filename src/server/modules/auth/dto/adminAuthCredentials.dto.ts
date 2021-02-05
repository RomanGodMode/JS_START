import { IsString } from 'class-validator'

export class AdminAuthCredentialsDto {
  @IsString()
  login: string
  @IsString()
  password: string
}
