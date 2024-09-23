/// <reference types="vite/client" />
import type { Eip1193Provider } from "ethers";

interface ProviderRpcError extends Error {
    message: string;
    code: number;
    data?: unknown;
}

type EventMap = {
    accountsChanged: (accounts: Array<string>) => void;
    chainChanged: (chainId: string) => void;
    disconnect: (error: ProviderRpcError) => void;
};

declare global {
    interface Window {
        ethereum: Eip1193Provider & {
            isMetaMask?: boolean;
            isConnected(): boolean;
            on<T extends keyof EventMap>(event: T, handler: EventMap[T]): void;
            removeListener<T extends keyof EventMap>(
                event: T,
                handler: EventMap[T],
            ): void;
        };
    }

    interface ImportMetaEnv {
        readonly VITE_APP_TITLE: string;
        readonly VITE_FAIRY_CONTRACT_ADDRESS: string;
        // 更多环境变量...
    }

    interface ImportMeta {
        readonly env: ImportMetaEnv;
    }
}
