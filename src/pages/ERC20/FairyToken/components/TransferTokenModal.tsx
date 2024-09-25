import { App, Form, Input, Modal } from "antd";
import NiceModal, { antdModalV5, useModal } from "@ebay/nice-modal-react";
import { useRequest } from "ahooks";
import { BrowserProvider } from "ethers";
import NumericInput from "@/components/NumericInput.tsx";
import { FairyToken__factory } from "@/typechain-types";

type EditForm = {
    address: string;
    tokens: string;
};

const TransferTokenModal = NiceModal.create<{
    reload?: () => void;
}>(({ reload }) => {
    const modal = useModal();

    const { modal: antdModal } = App.useApp();
    const [form] = Form.useForm<EditForm>();

    const { loading, run: give } = useRequest(
        async (values: EditForm) => {
            const { address, tokens } = values;

            const provider = new BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = FairyToken__factory.connect(
                import.meta.env.VITE_FAIRY_CONTRACT_ADDRESS,
                signer,
            );

            const tx = await contract.transfer(address, tokens);
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
            title={"代币转账"}
            okText={"转账"}
            okButtonProps={{
                loading,
            }}
            onOk={() => form.submit()}
            destroyOnClose
        >
            <Form preserve form={form} onFinish={(values) => give(values)}>
                <Form.Item
                    label={"转账地址"}
                    name={"address"}
                    rules={[{ required: true, message: "地址不能为空" }]}
                >
                    <Input placeholder={"请填写想要转账的地址"} />
                </Form.Item>
                <Form.Item
                    label={"代币数量"}
                    name={"tokens"}
                    initialValue={""}
                    rules={[{ required: true, message: "数量不能为空" }]}
                >
                    <NumericInput placeholder={"请填写想要转账代币数量"} />
                </Form.Item>
            </Form>
        </Modal>
    );
});

export default TransferTokenModal;
