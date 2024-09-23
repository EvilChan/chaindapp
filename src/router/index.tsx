import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import PageLoading from "@/components/PageLoading.tsx";

/**
 * 基于 React lazy 创建懒加载路由组件
 * @param load
 */
const createRouteElement = (load: Parameters<typeof lazy>[number]) => {
    const Component = lazy(load);
    return () => (
        <Suspense fallback={<PageLoading />}>
            <Component />
        </Suspense>
    );
};

const WalletLayout = createRouteElement(() => import("@/layouts/WalletLayout"));
const Home = createRouteElement(() => import("@/pages/Home"));
const About = createRouteElement(() => import("@/pages/About"));

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <WalletLayout />,
            children: [
                {
                    index: true,
                    element: <Home />,
                },
            ],
        },
        {
            path: "/about",
            element: <WalletLayout />,
            children: [
                {
                    index: true,
                    element: <About />,
                },
            ],
        },
    ],
    {
        basename: import.meta.env.BASE_URL,
    },
);

export default router;
