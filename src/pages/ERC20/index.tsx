import { useEffect, useState } from "react";
import { App, Button, Descriptions, Divider } from "antd";
import NiceModal from "@ebay/nice-modal-react";
import { BrowserProvider, toNumber } from "ethers";
import GetTokenModal from "@/pages/ERC20/components/GetTokenModal.tsx";
import GiveTokenModal from "@/pages/ERC20/components/GiveTokenModal.tsx";
import TransferTokenModal from "@/pages/ERC20/components/TransferTokenModal.tsx";
import { useWalletStore } from "@/stores/wallet.ts";
import { FairyContract__factory } from "@/typechain-types";

const ERC20 = () => {
    const { modal } = App.useApp();

    const address = useWalletStore((state) => state.selectedAddress);

    const [balance, setBalance] = useState<number>();
    const [tokenInfo, setTokenInfo] = useState<{
        name: string;
        symbol: string;
        totalSupply: number;
    }>();

    const loadTokenInfo = async () => {
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = FairyContract__factory.connect(
            import.meta.env.VITE_FAIRY_CONTRACT_ADDRESS,
            signer,
        );

        const name = await contract.name();
        const symbol = await contract.symbol();
        const totalSupply = await contract.totalSupply();

        setTokenInfo({
            name,
            symbol,
            totalSupply: toNumber(totalSupply),
        });

        const balance = await contract.balanceOf(signer.address);
        setBalance(toNumber(balance));
    };

    useEffect(() => {
        loadTokenInfo();
    }, []);

    useEffect(() => {
        if (address.length > 0) loadTokenInfo();
    }, [address]);

    const mint = async () => {
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = FairyContract__factory.connect(
            import.meta.env.VITE_FAIRY_CONTRACT_ADDRESS,
            signer,
        );
        const tx = await contract.mint(100);
        await tx.wait();
        modal.success({
            title: "交易地址",
            content: tx.hash,
        });
        await loadTokenInfo();
    };

    const transferToken = async () => {
        await NiceModal.show(TransferTokenModal, {
            reload: () => loadTokenInfo(),
        });
    };

    const giveToken = async () => {
        await NiceModal.show(GiveTokenModal, {
            reload: () => loadTokenInfo(),
        });
    };

    const getToken = async () => {
        await NiceModal.show(GetTokenModal, {
            reload: () => loadTokenInfo(),
        });
    };

    return (
        <div className={"p-4"}>
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
                ]}
            />
            <Divider />
            <div className={"flex gap-4"}>
                <Button type={"primary"} onClick={() => mint()}>
                    铸币
                </Button>
                <Button type={"primary"} onClick={() => transferToken()}>
                    代币转账
                </Button>
                <Button type={"primary"} onClick={() => giveToken()}>
                    代币赠送
                </Button>
                <Button type={"primary"} onClick={() => getToken()}>
                    代币获取
                </Button>
                <Button type={"primary"} onClick={() => giveToken()}>
                    购买代币
                </Button>
            </div>
        </div>
    );
};

export default ERC20;
