import React from "react";
import s from './loading-page.module.scss'
import { LoadingOutlined } from "@ant-design/icons";

const LoadingPage = () => {
  return (
    <div className={s.loadingPage} >
      <LoadingOutlined className={s.spinner} spin />
    </div>
  );
};

export default LoadingPage;
