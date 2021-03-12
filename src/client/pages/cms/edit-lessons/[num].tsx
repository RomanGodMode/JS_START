import React from "react";
import { useAdmin } from "~client/shared/hooks/useAdmin";

const EditLessonPage = () => {
  const { useAutorizePage } = useAdmin()
  useAutorizePage()

  return (
    <div>
      Edit Lesson
    </div>
  );
};

export default EditLessonPage;
