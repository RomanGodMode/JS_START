import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { Stage } from "~shared/types/lesson";

export type LessonDocument = Lesson & Document

@Schema()
export class Lesson {
  @Prop({ required: true, unique: true })
  num: number

  @Prop({ required: true, unique: true })
  theme: string

  @Prop()
  theory: string

  @Prop([String])
  tooltips: string[]

  @Prop({ required: true, type: [{ num: Number, title: String, task: String, answer: String }] })
  stages: Stage[]
}

export const LessonSchema = SchemaFactory.createForClass(Lesson)
