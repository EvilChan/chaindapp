import { Link } from "react-router-dom";
import BaseLayout from "@/layouts/BaseLayout";

const About = () => {
    return (
        <BaseLayout>
            About
            <Link to={"/"}>首页</Link>
        </BaseLayout>
    );
};

export default About;
