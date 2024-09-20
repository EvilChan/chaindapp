import { useEffect, useState } from "react";
import { Button, Descriptions, Divider } from "antd";
import { BrowserProvider, toNumber } from "ethers";
import WalletLayout from "@/layouts/WalletLayout";
import { useWalletStore } from "@/stores/wallet.ts";
import { FairyContract__factory } from "@/typechain-types";

const Home = () => {
    const address = useWalletStore((state) => state.selectedAddress);

    const [balance, setBalance] = useState<number>();
    const [tokenInfo, setTokenInfo] = useState<{
        name: string;
        symbol: string;
        totalSupply: number;
        surplus: number;
    }>();

    const loadTokenInfo = async () => {
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = FairyContract__factory.connect(
            "0x5FbDB2315678afecb367f032d93F642f64180aa3",
            signer,
        );

        const name = await contract.name();
        const symbol = await contract.symbol();
        const totalSupply = await contract.totalSupply();
        const balance = await contract.balanceOf(signer.address);
        const surplus = await contract.balanceOf(
            "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        );

        setBalance(toNumber(balance));
        setTokenInfo({
            name,
            symbol,
            totalSupply: toNumber(totalSupply),
            surplus: toNumber(surplus),
        });
    };

    useEffect(() => {
        if (address.length > 0) loadTokenInfo();
    }, [address]);

    const mint = async () => {};

    const buy = async () => {};

    return (
        <WalletLayout>
            <Descriptions
                layout={"vertical"}
                items={[
                    {
                        label: "当前钱包地址",
                        children: address,
                    },
                    {
                        label: "持有代币总量",
                        children: balance,
                    },
                ]}
            />
            <Divider />
            <Descriptions
                layout={"vertical"}
                items={[
                    {
                        label: "代币名称",
                        children: tokenInfo?.name,
                    },
                    {
                        label: "代币符号",
                        children: tokenInfo?.symbol,
                    },
                    {
                        label: "代币总量",
                        children: tokenInfo?.totalSupply,
                    },
                    {
                        label: "代币剩余",
                        children: tokenInfo?.surplus,
                    },
                ]}
            />
            <Divider />
            <div className={"flex gap-4"}>
                <Button type={"primary"} onClick={() => mint()}>
                    铸币
                </Button>
                <Button type={"primary"} onClick={() => buy()}>
                    购买代币
                </Button>
            </div>
        </WalletLayout>
    );
};

export default Home;
