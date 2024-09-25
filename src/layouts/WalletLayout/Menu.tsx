import { useLocation, useNavigate } from "react-router-dom";
import { Menu as AntdMenu } from "antd";

const Menu = () => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <AntdMenu
            mode="inline"
            theme={"dark"}
            selectedKeys={[location.pathname]}
            items={[
                {
                    label: "ERC20",
                    key: "erc20",
                    type: "group",
                    children: [{ label: "FairyToken", key: "/fairyToken" }],
                },
                {
                    label: "ERC721",
                    key: "erc721",
                    type: "group",
                    children: [{ label: "FairyNFT", key: "/fairyNFT" }],
                },
            ]}
            onSelect={({ key }) => navigate(key)}
        />
    );
};

export default Menu;
