const hre = require("hardhat");

async function main() {
  const ProofVault = await hre.ethers.getContractFactory("ProofVault");
  const proofVault = await ProofVault.deploy();
  await proofVault.deployed();
  console.log(`ProofVault deployed to: ${proofVault.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
