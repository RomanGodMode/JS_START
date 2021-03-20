import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { LessonsRepository } from './service/lessons.repository'
import { CreateLessonDto } from './dto/CreateLesson.dto'
import { AuthGuard } from '@nestjs/passport'
import { PurifyInterceptor } from '~server/modules/lesson/service/purify.interceptor'
import { ReplaceLessonDto } from '~server/modules/lesson/dto/ReplaceLesson.dto'

@Controller('api/lessons')
export class LessonsController {
  constructor(private readonly lessonRepository: LessonsRepository) {}

  @Get()
  @UseInterceptors(PurifyInterceptor)
  async getLessons() {
    return this.lessonRepository.getLessonHeads()
  }
  @Get(':num')
  @UseInterceptors(PurifyInterceptor)
  async getLesson(@Param('num') num: number): Promise<any> {
    try {
      return (await this.lessonRepository.getLessonByNum(num)).toObject()
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
  async updateLesson(@Param('num', ParseIntPipe) num: number, @Body() lesson: ReplaceLessonDto) {
    return this.lessonRepository.updateLesson(num, lesson)
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':num')
  async dropLessons(@Param('num') num: number) {
    return this.lessonRepository.deleteLessons(num)
  }
}
