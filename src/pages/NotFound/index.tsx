import { useNavigate } from "react-router-dom";
import { Button, Result } from "antd";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Result
            className="bg-white p-4"
            status="404"
            title="404"
            subTitle="很抱歉，您访问的页面不存在"
            extra={
                <Button type="primary" onClick={() => navigate("/")}>
                    返回首页
                </Button>
            }
        />
    );
};

export default NotFound;
