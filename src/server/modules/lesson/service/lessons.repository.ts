import { ConflictException, Injectable, NotAcceptableException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Lesson, LessonDocument } from '../model/lesson.schema'
import { Model } from 'mongoose'
import { CreateLessonDto } from '../dto/CreateLesson.dto'
import { ReplaceLessonDto } from '~server/modules/lesson/dto/ReplaceLesson.dto'

@Injectable()
export class LessonsRepository {
  constructor(
    @InjectModel(Lesson.name)
    private readonly lessonModel: Model<LessonDocument>
  ) {}

  async getLessonHeads(): Promise<any[]> {
    return this.lessonModel.aggregate([{ $project: { num: 1, theme: 1 } }]).sort({ num: 1 })
  }

  async isUniqueNum(num: number): Promise<boolean> {
    const lesson = await this.lessonModel.findOne({ num })
    return !lesson
  }
  async isUniqueTheme(theme: string): Promise<boolean> {
    const lesson = await this.lessonModel.findOne({ theme })
    return !lesson
  }

  async getLessonByNum(num: number): Promise<LessonDocument> {
    return this.lessonModel.findOne({ num })
  }

  async createLesson(createLessonDto: CreateLessonDto): Promise<LessonDocument> {
    const lesson = new this.lessonModel(createLessonDto)
    return lesson.save()
  }

  async updateLesson(replaceableLessonNumber: number, lesson: ReplaceLessonDto): Promise<LessonDocument> {
    if (replaceableLessonNumber !== lesson.num) {
      if (await this.lessonModel.findOne({ num: lesson.num })) throw new NotAcceptableException('Другой урок с таким же номером уже существует')
    }
    const oldLesson = await this.lessonModel.findOne({ num: replaceableLessonNumber })
    if (oldLesson.theme !== lesson.theme) {
      if (await this.lessonModel.findOne({ theme: lesson.theme })) {
        throw new ConflictException('Такая тема урока уже есть у другого урока')
      }
    }
    await this.lessonModel.deleteOne({ num: replaceableLessonNumber }).exec()
    return await new this.lessonModel(lesson).save()
  }

  async deleteLessons(num: number): Promise<any> {
    return this.lessonModel.deleteOne({ num })
  }
}
