const sha256 = require('sha256');

// Function to hash one or two inputs
function createHash(input1, input2 = null) {
  if (input2 === null) {
    // Hash a single value
    return sha256(input1.toString());
  }
  // Hash two combined values
  return sha256(`${input1.toString()}:${input2.toString()}`);
}

// Function to create a single block hash from a list of transactions
function createBlockHash(transactions) {
  if (!Array.isArray(transactions) || transactions.length === 0) return null; // Invalid input check
  if (transactions.length === 1) return createHash(transactions[0]); // Single transaction case

  let hashes = transactions.map((txn) => createHash(txn)); // Convert transactions to hashes

  while (hashes.length > 1) {
    const newHashes = [];
    for (let i = 0; i < hashes.length; i += 2) {
      if (i + 1 < hashes.length) {
        // Combine two hashes
        newHashes.push(createHash(hashes[i], hashes[i + 1]));
      } else {
        // Single remaining hash
        newHashes.push(createHash(hashes[i]));
      }
    }
    hashes = newHashes; // Update hashes with combined hashes
  }
  return hashes[0]; // Final single hash
}

// Test
console.log('Single Hash:', createHash('hello')); // Hash one value
console.log('Two Values Hash:', createHash('hello', 'world')); // Hash two values

const oddTransactions = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
console.log('Block Hash (odd transactions):', createBlockHash(oddTransactions));

const evenTransactions = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
console.log('Block Hash (even transactions):', createBlockHash(evenTransactions));
