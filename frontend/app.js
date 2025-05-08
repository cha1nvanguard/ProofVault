let contract;
const CONTRACT_ADDRESS = "<PUT_DEPLOYED_CONTRACT_ADDRESS_HERE>";
const ABI = [
  "function storeProof(bytes32) external",
  "function verifyProof(bytes32) external view returns (address, uint256)"
];

async function connectContract() {
  if (!window.ethereum) {
    alert("Install MetaMask");
    return;
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
}

function hashFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const hash = ethers.utils.keccak256(new Uint8Array(reader.result));
      resolve(hash);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

async function storeProof() {
  await connectContract();
  const file = document.getElementById("fileInput").files[0];
  const hash = await hashFile(file);
  const tx = await contract.storeProof(hash);
  await tx.wait();
  document.getElementById("result").innerText = `Stored proof with hash: ${hash}`;
}

async function verifyProof() {
  await connectContract();
  const file = document.getElementById("fileInput").files[0];
  const hash = await hashFile(file);
  try {
    const [owner, timestamp] = await contract.verifyProof(hash);
    document.getElementById("result").innerText = `Proof found:\nOwner: ${owner}\nTimestamp: ${new Date(timestamp * 1000).toLocaleString()}`;
  } catch (err) {
    document.getElementById("result").innerText = "Proof not found.";
  }
}
