import { Module } from '@nestjs/common'
import { LessonsController } from './lessons.controller'
import { LessonsRepository } from './service/lessons.repository'
import { MongooseModule } from '@nestjs/mongoose'
import { Lesson, LessonSchema } from './model/lesson.schema'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [MongooseModule.forFeature([{ name: Lesson.name, schema: LessonSchema }]), AuthModule],
  controllers: [LessonsController],
  providers: [
    LessonsRepository
    // UniqueLessonsNums
  ]
})
export class LessonsModule {}
