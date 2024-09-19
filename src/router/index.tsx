import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import PageLoading from "@/components/PageLoading.tsx";

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: (
                <Suspense fallback={<PageLoading />}>
                    <Home />
                </Suspense>
            ),
        },
        {
            path: "/about",
            element: (
                <Suspense fallback={<PageLoading />}>
                    <About />
                </Suspense>
            ),
        },
    ],
    {
        basename: import.meta.env.BASE_URL,
    },
);

export default router;
