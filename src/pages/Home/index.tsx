import { Link } from "react-router-dom";
import BaseLayout from "@/layouts/BaseLayout";

const Home = () => {
    return (
        <BaseLayout>
            Home
            <Link to={"/about"}>About</Link>
        </BaseLayout>
    );
};

export default Home;
