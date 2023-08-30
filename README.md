# Dynamic NFT Project using Chainlink Oracles

This is a Hardhat project that demonstrates the creation of Dynamic NFTs using Chainlink's decentralized and cryptographically secured oracle network to track asset price data. It leverages Chainlink Automation to automate the NFT smart contract and update NFTs based on the asset price data.

## Overview

The project uses Chainlink's reliable and tamper-resistant oracles to obtain real-time asset price data. Here's how it works:

- If the market price moves up, the smart contract will randomly select one of three bullish images to update the NFT. This randomness is achieved using Chainlink's Verifiable Randomness Function (VRF).
- Conversely, if the price feed's data moves down, the NFT will dynamically update to one of three bearish images, also randomly selected using Chainlink VRF.

## Features

- **Dynamic NFTs:** NFTs that change their appearance based on real-time market data.
- **Chainlink Oracles:** Secure and reliable asset price data sourced from Chainlink's decentralized oracle network.
- **Chainlink VRF:** Verifiable Randomness Function ensures fairness and unpredictability in selecting images.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) installed

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/KunJon-analytics/dynamic-nft.git
   cd dynamic-nft
   ```

2. Install project dependencies:

   ```bash
   npm install
   ```

3. Configure your environment variables for Sepolia (`.env`):

   ```bash
   SEPOLIA_TESTNET_RPC_URL=YOUR_ALCHEMY_SEPOLIA_TESTNET_RPC_URL
   PRIVATE_KEY=YOUR_PRIVATE_KEY
   ETHERSCAN_API_KEY=YOUR_ETHERSCAN_API_KEY
   ```

## Usage

1. Compile the smart contracts:

   ```bash
   npx hardhat compile
   ```

2. Connect your Metamask to Sepolia and Acquire test LINK and test ETH from the Chainlink Faucet

- [Test Link](https://faucets.chain.link/)
- [Sepolia ETH](https://sepoliafaucet.com/)

3. Deploy the contracts:

   ```bash
   npx hardhat run scripts/deploy.js --network sepolia
   ```

4. Verify the contract so we can use etherscan to interact with the contract:

   ```bash
   npx hardhat run scripts/verifyToken.js --network sepolia
   ```

5. Register a Custom Logic Upkeep

Next, register your NFT smart contract that is deployed as a new “custom logic Upkeep” using the [Chainlink Automation App](https://docs.chain.link/chainlink-automation/register-upkeep/)

6. Create and fund a VRF subscription

[Create a Subscription ID](https://vrf.chain.link/sepolia/new) using your wallet address. The Subscription ID will be used in your contract when requesting a random value.

6. Set the subscription ID in the contract by interacting with the contract via etherscan

   ```bash
   setSubscriptionId(<SUBSCRIPTION_ID>)
   ```

7. Mint your first token, and check its URI via etherscan

   ```bash
   safeMint(<YOUR_ADDRESS>)
   ```

   It should be the gamer_bull.json. Check on OpenSea if you like!

<!-- 3. Interact with the NFT smart contract using the provided scripts.

## Example Scripts

- `scripts/updateNFT.js`: Trigger the dynamic update of the NFT based on market data.
- `scripts/getNFTData.js`: Retrieve current NFT data.
- `scripts/mintNFT.js`: Mint a new NFT. -->

## License

This project is licensed under the MIT License -
