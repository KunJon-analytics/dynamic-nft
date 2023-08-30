const { expect } = require("chai");
const { ethers } = require("hardhat");
const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

// sepolia address: 0x1FdCDf0e836e2a9060d10496AFFeFae4FB9Fd166

describe("Test Bull&Bear", () => {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployBullAndBearFixture() {
    // Contracts are deployed using the first signer/account by default
    const [deployer, owner1] = await ethers.getSigners();

    const decimals = 8;
    const initialAnswer = 3034715771688;
    const baseFee = ethers.parseEther("0.1");
    const gasPriceLink = 1000000000;
    const updateInterval = 10;
    const TOKEN_ID_0 = 0;
    const TOKEN_ID_1 = 1;

    const Token = await ethers.getContractFactory("BullBear");
    const MockV3Aggregator = await ethers.getContractFactory(
      "MockV3Aggregator"
    );
    const VRFCoordinatorV2Mock = await ethers.getContractFactory(
      "VRFCoordinatorV2Mock"
    );
    const priceFeed = await MockV3Aggregator.deploy(decimals, initialAnswer);
    const vrfCoordinator = await VRFCoordinatorV2Mock.deploy(
      baseFee,
      gasPriceLink
    );
    const priceFeedAddress = await priceFeed.getAddress();
    const vrfCoordinatorAddress = await vrfCoordinator.getAddress();
    const token = await Token.deploy(
      updateInterval,
      priceFeedAddress,
      vrfCoordinatorAddress
    );

    return {
      token,
      deployer,
      owner1,
      priceFeed,
      vrfCoordinator,
      TOKEN_ID_0,
      TOKEN_ID_1,
    };
  }
  it("Should deploy Bull&Bear token contract correctly", async () => {
    const { token, deployer, TOKEN_ID_0 } = await loadFixture(
      deployBullAndBearFixture
    );

    expect(await token.totalSupply()).to.equal(0);
    expect(await token.owner()).to.equal(deployer.address);
    expect(await token.balanceOf(deployer.address)).to.equal(0);

    await expect(token.ownerOf(TOKEN_ID_0)).to.be.revertedWith(
      "ERC721: invalid token ID"
    );
    await expect(token.tokenURI(TOKEN_ID_0)).to.be.revertedWith(
      "ERC721: invalid token ID"
    );
  });

  it("should mint token correctly", async () => {
    const { token, deployer, TOKEN_ID_0, TOKEN_ID_1 } = await loadFixture(
      deployBullAndBearFixture
    );
    await token.safeMint(deployer.address);

    expect(await token.ownerOf(TOKEN_ID_0)).to.equal(deployer.address);
    expect(await token.tokenURI(TOKEN_ID_0)).to.include(
      "filename=gamer_bull.json"
    );

    await expect(token.tokenURI(TOKEN_ID_1)).to.be.revertedWith(
      "ERC721: invalid token ID"
    );
  });
});
