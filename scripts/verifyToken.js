// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const updateInterval = 7 * 24 * 60 * 60;
  const priceFeedAddress = "0x1b44f3514812d835eb1bdb0acb33d3fa3351ee43";
  const vrfCoordinatorAddress = "0x8103b0a8a00be2ddc778e6e7eaa21791cd364625";
  const contractAddress = "0x1FdCDf0e836e2a9060d10496AFFeFae4FB9Fd166";

  await hre.run("verify:verify", {
    address: contractAddress,
    constructorArguments: [
      updateInterval,
      priceFeedAddress,
      vrfCoordinatorAddress,
    ],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
