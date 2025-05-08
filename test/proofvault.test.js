const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ProofVault", function () {
  let proofVault, owner;

  beforeEach(async () => {
    [owner] = await ethers.getSigners();
    const ProofVault = await ethers.getContractFactory("ProofVault");
    proofVault = await ProofVault.deploy();
    await proofVault.deployed();
  });

  it("should store and verify a proof", async function () {
    const proof = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("my secret doc"));
    await proofVault.storeProof(proof);
    const result = await proofVault.verifyProof(proof);
    expect(result[0]).to.equal(owner.address);
    expect(result[1]).to.be.gt(0);
  });

  it("should not allow duplicate proofs", async function () {
    const proof = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("duplicate doc"));
    await proofVault.storeProof(proof);
    await expect(proofVault.storeProof(proof)).to.be.revertedWith("Proof already exists");
  });
});
