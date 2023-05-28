import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {
    deployments: { deploy },
    getNamedAccounts,
    getChainId,
  } = hre;
  const { deployer } = await getNamedAccounts();

  if ((await getChainId()) !== "31337") {
    throw new Error(
      "This deployment script should only be used with hardhat network"
    );
  }

  await deploy("SdeBitmapsExternal", {
    contract: "SdeBitmapsExternal",
    from: deployer,
    args: [0, 0, 0],
    log: true,
    autoMine: true,
  });
};

export default func;
func.tags = ["testbed", "_sdeBitmaps"];
