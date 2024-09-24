import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useMatches } from "react-router-dom";
import { Typography } from "antd";

const Logo = () => {
    const matches = useMatches();

    const [subTitle, setSubTitle] = useState<string>();

    useEffect(() => {
        const subTitle = getSubTitle();
        subTitle && setSubTitle(subTitle);
    }, [location.pathname]);

    const getSubTitle = () => {
        const route = matches.find(
            (item) => item.pathname === location.pathname,
        );
        if (route?.handle) {
            return (route.handle as { meta: { title: string } }).meta.title;
        }
        return void 0;
    };

    return (
        <>
            <Helmet>
                <title>
                    {subTitle
                        ? `${subTitle} - ${import.meta.env.VITE_APP_TITLE}`
                        : import.meta.env.VITE_APP_TITLE}
                </title>
            </Helmet>
            <a className="flex items-center h-full text-nowrap">
                <Typography.Title
                    level={5}
                    style={{
                        marginTop: "0.5em",
                        marginLeft: "20px",
                        color: "#fff",
                    }}
                >
                    {import.meta.env.VITE_APP_TITLE}
                </Typography.Title>
            </a>
        </>
    );
};

export default Logo;
