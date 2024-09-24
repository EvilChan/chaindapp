import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const FairyTokenModule = buildModule("FairyTokenModule", (m) => {
    const contract = m.contract("FairyToken");

    return contract.module.results;
});

export default FairyTokenModule;
