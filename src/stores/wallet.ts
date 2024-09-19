import { create } from "zustand";

type WalletState = {
    selectedAddress: string;
};

type WalletAction = {
    setSelectedAddress: (address: string) => void;
    reset: () => void;
};

const useWalletStore = create<WalletState & WalletAction>((setState) => ({
    selectedAddress: "",
    setSelectedAddress: (address) => {
        setState({
            selectedAddress: address,
        });
    },
    reset: () => {
        setState({
            selectedAddress: "",
        });
    },
}));

export { useWalletStore };
