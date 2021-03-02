import { LessonHead } from '~shared/types/lesson'
import React, { FC } from 'react'
import s from './lesson-card.module.scss'
import Link from 'next/link'
import { EditOutlined } from '@ant-design/icons'

type LessonCardProps = {
  lesson: LessonHead
}

export const LessonCard: FC<LessonCardProps> = ({ lesson }) => {
  return (
    <div className={`${s.lesson}`}>
      <Link href={`edit-lessons/${lesson.num}`}>
        <div className={`${s.lessonCardBody}`}>
          <span className={s.text}>
            {lesson.num}. {lesson.theme}
          </span>
          <EditOutlined style={{ fontSize: 27, color: '#fff' }} />
        </div>
      </Link>
    </div>
  )
}
