import React, { FC } from "react";
import s from "~client/components/for-admin/edit-lessons/add-lesson-page/edit-tips/edit-tips.module.scss";

type Props = {
  text: string
}

const CaptionDivider: FC<Props> = ({text}) => {
  return (
    <>
      <h4 className={s.caption}>{text}</h4>
      <hr style={{ marginBottom: 30 }} />
    </>
  );
};

export default CaptionDivider;
