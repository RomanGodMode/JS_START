export type Stage = {
  num: number
  title: string
  task: string
  answer: string
}

export type StageWithoutNum = {
  title: string
  task: string
  answer: string
}

export type NormalizedTooltip = {
  tipText: string
}

export type NormalizedLesson = {
  num: number
  theme: string
  theory: string
  tooltips: NormalizedTooltip[]
  stages: StageWithoutNum[]
}

export type Lesson = {
  num: number
  theme: string
  theory: string
  tooltips: string[]
  stages: Stage[]
}
export type LessonHead = {
  num: number
  theme: string
}
