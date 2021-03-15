import { Module } from '@nestjs/common'
import { LessonsController } from './lessons.controller'
import { LessonsRepository } from './service/lessons.repository'
import { MongooseModule } from '@nestjs/mongoose'
import { Lesson, LessonSchema } from './model/lesson.schema'
import { AuthModule } from '../auth/auth.module'
import { StagesUniqueNumsConstraint } from '~server/modules/lesson/dto/validators/StagesNum.validator'
import { UniqueLessonNumConstraint } from './dto/validators/UniqueLessonNum.validator'
import { UniqueLessonThemeConstraint } from '~server/modules/lesson/dto/validators/UniqueLessonTheme.validator'

@Module({
  imports: [MongooseModule.forFeature([{ name: Lesson.name, schema: LessonSchema }]), AuthModule],
  controllers: [LessonsController],
  providers: [LessonsRepository, StagesUniqueNumsConstraint, UniqueLessonNumConstraint, UniqueLessonThemeConstraint]
})
export class LessonsModule {}
