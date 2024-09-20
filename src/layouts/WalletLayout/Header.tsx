import { FC, useEffect, useState } from "react";
import { App, Button } from "antd";
import classnames from "classnames";
import { BrowserProvider, isError } from "ethers";
import { useWalletStore } from "@/stores/wallet.ts";

const Header: FC = () => {
    const { modal, message } = App.useApp();

    const address = useWalletStore((state) => state.selectedAddress);
    const setAddress = useWalletStore((state) => state.setSelectedAddress);
    const reset = useWalletStore((state) => state.reset);

    const [isHover, setIsHover] = useState<boolean>(false);

    const init = async () => {
        const provider = new BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_accounts", {});
        if (accounts.length <= 0) return;
        setAddress(accounts[0]);
    };

    useEffect(() => {
        if (window.ethereum) {
            init();
            if (window.ethereum.isMetaMask) {
                const handle = () => init();
                window.ethereum.on("accountsChanged", handle);
                return () => {
                    window.ethereum.removeListener("accountsChanged", handle);
                };
            }
        } else {
            modal.warning({
                title: "未检测到钱包",
                content: (
                    <span>
                        请安装
                        <Button
                            type={"link"}
                            size={"small"}
                            href={"https://metamask.io/"}
                            target={"_blank"}
                        >
                            MetaMask
                        </Button>
                    </span>
                ),
            });
        }
    }, []);

    const connectWallet = async () => {
        try {
            const provider = new BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", {});
            init();
        } catch (error) {
            console.error(error);
            if (isError(error, "ACTION_REJECTED")) {
                message.error(error.shortMessage);
            }
        }
    };

    return (
        <div className={"h-full flex"}>
            <div className={"flex-1"}></div>
            <div>
                <div className={"flex items-center gap-4 h-full"}>
                    {address ? (
                        <Button
                            className={"relative"}
                            shape="round"
                            type={isHover ? "primary" : "default"}
                            danger={isHover}
                            onMouseEnter={() => setIsHover(true)}
                            onMouseLeave={() => setIsHover(false)}
                            onClick={() => reset()}
                        >
                            <span
                                className={classnames({
                                    "opacity-0": isHover,
                                })}
                            >
                                {`${address.substring(0, 7)}...${address.substring(address.length - 5)}`}
                            </span>
                            <span
                                className={classnames(
                                    "absolute top-1/2 -translate-y-1/2 opacity-0",
                                    {
                                        "opacity-100": isHover,
                                    },
                                )}
                            >
                                断开连接
                            </span>
                        </Button>
                    ) : (
                        <Button
                            type="primary"
                            shape="round"
                            onClick={() => connectWallet()}
                        >
                            连接钱包
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
