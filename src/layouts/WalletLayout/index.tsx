import { FC } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import { App, ConfigProvider, Layout } from "antd";
import zhCN from "antd/locale/zh_CN";
import NiceModal from "@ebay/nice-modal-react";
import Header from "@/layouts/WalletLayout/Header.tsx";
import Logo from "@/layouts/WalletLayout/Logo.tsx";
import Menu from "@/layouts/WalletLayout/Menu.tsx";
import { useSettingStore } from "@/stores/setting.ts";

const WalletLayout: FC = () => {
    const collapsed = useSettingStore((state) => state.collapsed);
    const siderWidth = useSettingStore((state) => state.siderWidth);
    const headerHeight = useSettingStore((state) => state.headerHeight);

    return (
        <ConfigProvider locale={zhCN}>
            <App>
                <NiceModal.Provider>
                    <HelmetProvider>
                        <Layout className={"h-screen"}>
                            <Layout.Sider
                                collapsed={collapsed}
                                width={siderWidth}
                            >
                                <Layout.Header
                                    style={{
                                        height: headerHeight,
                                        padding: 0,
                                    }}
                                >
                                    <Logo />
                                </Layout.Header>
                                <Layout.Content>
                                    <Menu />
                                </Layout.Content>
                            </Layout.Sider>
                            <Layout>
                                <Layout.Header
                                    className={"p-0 bg-white shadow"}
                                    style={{
                                        height: "50px",
                                        lineHeight: "50px",
                                    }}
                                >
                                    <Header />
                                </Layout.Header>
                                <Layout.Content style={{ padding: "10px" }}>
                                    <div className={"h-full overflow-y-auto"}>
                                        <Outlet />
                                    </div>
                                </Layout.Content>
                            </Layout>
                        </Layout>
                    </HelmetProvider>
                </NiceModal.Provider>
            </App>
        </ConfigProvider>
    );
};

export default WalletLayout;
