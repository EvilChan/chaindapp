import { FC } from "react";
import { Outlet } from "react-router-dom";
import { App, ConfigProvider, Layout } from "antd";
import zhCN from "antd/locale/zh_CN";
import NiceModal from "@ebay/nice-modal-react";
import Header from "@/layouts/WalletLayout/Header.tsx";

const WalletLayout: FC = () => {
    return (
        <ConfigProvider locale={zhCN}>
            <App>
                <NiceModal.Provider>
                    <Layout className={"h-screen"}>
                        <Layout.Header
                            className={"px-4 py-0 bg-white"}
                            style={{ height: 50 }}
                        >
                            <Header />
                        </Layout.Header>
                        <Layout.Content>
                            <div className={"h-full overflow-y-auto"}>
                                <Outlet />
                            </div>
                        </Layout.Content>
                    </Layout>
                </NiceModal.Provider>
            </App>
        </ConfigProvider>
    );
};

export default WalletLayout;
