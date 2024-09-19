import "@nomicfoundation/hardhat-toolbox";
import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
    solidity: "0.8.24",
    typechain: {
        outDir: "src/typechain-types",
    },
};

export default config;
