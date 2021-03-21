export const unnormalizeLesson = lesson => ({
  ...lesson,
  stages: lesson.stages.map((s, i) => ({ ...s, num: i + 1 })),
  tooltips: lesson.tooltips.map(t => t.tipText),
  theory: lesson.theory || ''
})
