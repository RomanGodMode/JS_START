import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from "@nestjs/common";
import { LessonsRepository } from './service/lessons.repository'
import { CreateLessonDto } from './dto/CreateLesson.dto'
import { AuthGuard } from "@nestjs/passport";

@Controller('api/lessons')
export class LessonsController {
  constructor(private readonly lessonRepository: LessonsRepository) {}

  private parseLesson(rawLesson: any) {
    const deleteIds = (obj: any) => {
      Object.keys(obj).forEach(key => {
        if (key === '_id' || key === '__v') delete obj[key]
        else if (typeof obj[key] === 'object') deleteIds(obj[key])
      })
      return obj
    }

    return deleteIds(rawLesson)
  }

  @Get()
  async getLessons() {
    return this.parseLesson(await this.lessonRepository.getLessonHeads())
  }
  @Get(':num')
  async getLesson(@Param('num') num: number): Promise<any> {
    try {
      return this.parseLesson((await this.lessonRepository.getLessonByNum(num)).toObject())
    } catch (ex) {
      throw new NotFoundException('Нет такого урока')
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createLesson(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonRepository.createLesson(createLessonDto)
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':num')
  async updateLesson(@Param('num') num: number, @Body() createLessonDto: CreateLessonDto) {
    return this.lessonRepository.updateLesson(num, createLessonDto)
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':num')
  async dropLessons(@Param('num') num: number) {
    return this.lessonRepository.deleteLessons(num)
  }
}
