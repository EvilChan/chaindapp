import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const FairyContractModule = buildModule("FairyContractModule", (m) => {
    const contract = m.contract("FairyContract");

    return contract.module.results;
});

export default FairyContractModule;
