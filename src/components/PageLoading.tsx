import { FC, useEffect } from "react";
import { Spin } from "antd";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const PageLoading: FC = () => {
    useEffect(() => {
        NProgress.start();
        return () => {
            NProgress.done();
        };
    }, []);

    return (
        <div className={"flex h-screen justify-center items-center"}>
            <Spin size={"large"} />
        </div>
    );
};

export default PageLoading;
