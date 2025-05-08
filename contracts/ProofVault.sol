pragma solidity ^0.8.20;

contract ProofVault {
    struct Proof {
        address owner;
        uint256 timestamp;
    }

    mapping(bytes32 => Proof) public proofs;

    event ProofStored(bytes32 indexed proofHash, address indexed owner, uint256 timestamp);

    function storeProof(bytes32 proofHash) external {
        require(proofs[proofHash].timestamp == 0, "Proof already exists");
        proofs[proofHash] = Proof({owner: msg.sender, timestamp: block.timestamp});
        emit ProofStored(proofHash, msg.sender, block.timestamp);
    }

    function verifyProof(bytes32 proofHash) external view returns (address, uint256) {
        Proof memory proof = proofs[proofHash];
        require(proof.timestamp != 0, "Proof does not exist");
        return (proof.owner, proof.timestamp);
    }
}
