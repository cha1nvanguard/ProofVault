# 🔐 ProofVault

**ProofVault** is a decentralized notarization system that lets users store and verify document proofs (hashes) on the Ethereum blockchain.

## ✨ Features

- 📁 Upload files to generate unique SHA3 hashes
- 🔒 Store those hashes immutably on Ethereum
- 🧾 Verify ownership and timestamp of any proof

## 🧱 Smart Contract

The smart contract stores document hashes with owner and timestamp data:

```
mapping(bytes32 => Proof) public proofs;
```

## 🚀 Quick Start

### 1. Install dependencies

```
npm install
```

### 2. Compile contract

```
npx hardhat compile
```

### 3. Run tests

```
npx hardhat test
```

### 4. Deploy contract

```
npx hardhat run scripts/deploy.js --network <your-network>
```

Update the deployed contract address in `frontend/app.js`.

### 5. Open the frontend

Just open `frontend/index.html` in your browser with MetaMask enabled.

## 📄 License
MIT License
