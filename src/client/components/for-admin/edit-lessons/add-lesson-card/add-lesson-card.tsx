import React from "react";
import s from "~client/components/for-admin/edit-lessons/lesson-card/lesson-card.module.scss";
import Link from "next/link";
import { PlusOutlined } from "@ant-design/icons";

export const AddLessonCard = () => {
  return (
    <div className={`${s.lesson}`}>
      <Link href={`edit-lessons/add`}>
        <div className={`${s.lessonCardBody}`}>
          <span className={s.text}>
            Добавить урок
          </span>
          <PlusOutlined style={{ fontSize: 27, color: '#fff' }} />
        </div>
      </Link>
    </div>
  )
}
