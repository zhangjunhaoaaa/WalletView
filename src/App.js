import React, { useState } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const newProvider = new ethers.BrowserProvider(connection);
    setProvider(newProvider);
    
    const signer = await newProvider.getSigner();
    const newAccount = await signer.getAddress();
    setAccount(newAccount);

    console.log("Connected account:", newAccount);
  } catch (error) {
    console.error("Failed to connect wallet", error);
  }
};


  return (
    <div>
      <h1>My DApp</h1>
      <button onClick={connectWallet}>Connect Wallet</button>
      {account && <p>Connected account: {account}</p>}
    </div>
  );
}

export default App;