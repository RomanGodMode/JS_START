import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Lesson, LessonDocument } from '../model/lesson.schema'
import { Model } from 'mongoose'
import { CreateLessonDto } from '../dto/CreateLesson.dto'

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
    const lessons = new this.lessonModel(createLessonDto)
    return lessons.save()
  }

  async updateLesson(replaceableLessonNumber: number, createLessonDto: CreateLessonDto): Promise<LessonDocument> {
    return this.lessonModel.replaceOne({ num: replaceableLessonNumber }, createLessonDto)
  }

  async deleteLessons(num: number): Promise<any> {
    return this.lessonModel.deleteOne({ num })
  }
}
