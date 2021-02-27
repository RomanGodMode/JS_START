import { LessonHead } from "~shared/types/lesson";
import React, { FC } from "react";
import s from "~client/static/styles/pages-styles/lessons/index.module.scss";
import Link from "next/link";

type LessonCardProps = {
  lesson: LessonHead
  isPassed: boolean
}

export const LessonCard: FC<LessonCardProps> = ({ lesson, isPassed }) => {
  return (
    <div className={`${s.lesson}`}>
      <Link href={`/lessons/${lesson.num}`}>
        <div className={`${s.lessonCardBody} ${isPassed? s.success : ' '}`}>
          <span className={s.text}>
            {lesson.num}. {lesson.theme}
          </span>
          <i className="fas fa-arrow-right" />
        </div>
      </Link>
    </div>
  )
}
