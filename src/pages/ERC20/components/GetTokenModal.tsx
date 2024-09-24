import { useState } from "react";
import { App, Form, Input, Modal } from "antd";
import NiceModal, { antdModalV5, useModal } from "@ebay/nice-modal-react";
import { useDebounceEffect, useRequest } from "ahooks";
import { BrowserProvider, toNumber } from "ethers";
import NumericInput from "@/components/NumericInput.tsx";
import { FairyContract__factory } from "@/typechain-types";

type EditForm = {
    address: string;
    tokens: string;
};

const GiveTokenModal = NiceModal.create<{
    reload?: () => void;
}>(({ reload }) => {
    const modal = useModal();

    const { modal: antdModal } = App.useApp();
    const [form] = Form.useForm<EditForm>();
    const address = Form.useWatch("address", form);
    const [maxToken, setMaxToken] = useState<number>();

    const { run } = useRequest(
        async (address: string) => {
            const provider = new BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = FairyContract__factory.connect(
                import.meta.env.VITE_FAIRY_CONTRACT_ADDRESS,
                signer,
            );

            return await contract.allowance(address, signer.address);
        },
        {
            manual: true,
            onSuccess: (data) => {
                form.setFieldValue("tokens", toNumber(data));
                setMaxToken(toNumber(data));
            },
        },
    );

    useDebounceEffect(() => {
        if (address) {
            run(address);
        }
    }, [address]);

    const { loading, run: give } = useRequest(
        async (values: EditForm) => {
            const { address, tokens } = values;

            const provider = new BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = FairyContract__factory.connect(
                import.meta.env.VITE_FAIRY_CONTRACT_ADDRESS,
                signer,
            );

            const tx = await contract.transferFrom(
                address,
                signer.address,
                tokens,
            );
            await tx.wait();
            return tx;
        },
        {
            manual: true,
            onSuccess: (tx) => {
                modal.remove();
                antdModal.success({
                    title: "交易地址",
                    content: tx.hash,
                });
                reload?.();
            },
        },
    );

    return (
        <Modal
            {...antdModalV5(modal)}
            title={"代币获取"}
            okText={"获取"}
            okButtonProps={{
                loading,
            }}
            onOk={() => form.submit()}
            destroyOnClose
        >
            <Form preserve form={form} onFinish={(values) => give(values)}>
                <Form.Item
                    label={"获取代币地址"}
                    name={"address"}
                    rules={[{ required: true, message: "地址不能为空" }]}
                >
                    <Input placeholder={"请填写获取代币的地址"} />
                </Form.Item>
                <Form.Item
                    label={"代币数量"}
                    name={"tokens"}
                    initialValue={""}
                    rules={[
                        { required: true, message: "数量不能为空" },
                        {
                            type: "number",
                            max: maxToken,
                            message: "数量不能超过预设值",
                        },
                    ]}
                >
                    <NumericInput
                        disabled={typeof maxToken === "undefined"}
                        placeholder={"请填写想要获取代币数量"}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
});

export default GiveTokenModal;
