import { FC, PropsWithChildren } from "react";
import { App, ConfigProvider, Layout } from "antd";
import zhCN from "antd/locale/zh_CN";
import Header from "@/layouts/BaseLayout/Header.tsx";

const BaseLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <ConfigProvider locale={zhCN}>
            <App>
                <Layout className={"h-screen"}>
                    <Layout.Header
                        className={"p-0 bg-white"}
                        style={{ height: 50 }}
                    >
                        <Header />
                    </Layout.Header>
                    <Layout.Content>
                        <div className={"h-full overflow-y-auto"}>
                            {children}
                        </div>
                    </Layout.Content>
                </Layout>
            </App>
        </ConfigProvider>
    );
};

export default BaseLayout;
