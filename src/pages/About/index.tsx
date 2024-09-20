import { Link } from "react-router-dom";
import WalletLayout from "@/layouts/WalletLayout";

const About = () => {
    return (
        <WalletLayout>
            About
            <Link to={"/"}>首页</Link>
        </WalletLayout>
    );
};

export default About;
