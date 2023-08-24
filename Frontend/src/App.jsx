import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyGroup from "./components/MyGroup.jsx";
import walletConnectFcn from "./components/hedera/walletConnect.js";
import contractDeployFcn from "./components/hedera/contractDeploy.js";
import contractExecuteFcn from "./components/hedera/contractExecute.js";
import "./styles/App.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import NFTabi from "./contracts/NFTabi.js";
import NFTbytecode from "./contracts/NFTbytecode.js";
import AIabi from "./contracts/AIabi.js";
import AIbytecode from "./contracts/AIbytecode.js";
import Home from "./components/Home/Home";
import Raffle from "./components/Raffles";
import { ethers } from "ethers";


const NFTaddress = '0xb39C1Ae40746F96be59d11C42e26a24EbdA154Ce';
const AIaddress = '0x30CA0bb56d58c01E702B1b49895d5cB5249F76f1';

function App() {
	const [walletData, setWalletData] = useState();
	const [account, setAccount] = useState();
	const [network, setNetwork] = useState();
	const [contractAddress, setContractAddress] = useState();
	const [contractTextSt, setContractTextSt] = useState();
	const [executeTextSt, setExecuteTextSt] = useState();

	const [connectLinkSt, setConnectLinkSt] = useState("");
	const [contractLinkSt, setContractLinkSt] = useState();
	const [executeLinkSt, setExecuteLinkSt] = useState();

	async function connectWallet() {
		if (account !== undefined) {
			// setConnectTextSt(`🔌 Account ${account} already connected ⚡ ✅`);
		} else {
			const wData = await walletConnectFcn();

			let newAccount = wData[0];
			let newNetwork = wData[2];
			if (newAccount !== undefined) {
				// setConnectTextSt(`🔌 Account ${newAccount} connected ⚡ ✅`);
				setConnectLinkSt(`https://hashscan.io/${newNetwork}/account/${newAccount}`);

				setWalletData(wData);
				setAccount(newAccount);
				setNetwork(newNetwork);
				setContractTextSt();
			}
		}
	}

	async function contractDeploy() {
		if (account === undefined) {
			setContractTextSt("🛑 Connect a wallet first! 🛑");
		} else {
			const cAddress = await contractDeployFcn(walletData);

			if (cAddress === undefined) {
			} else {
				setContractAddress(cAddress);
				setContractTextSt(`Contract ${cAddress} deployed ✅`);
				setExecuteTextSt(``);
				setContractLinkSt(`https://hashscan.io/${network}/address/${cAddress}`);
			}
		}
	}

	async function contractExecute() {
		if (contractAddress === undefined) {
			setExecuteTextSt("🛑 Deploy a contract first! 🛑");
		} else {
			const [txHash, finalCount] = await contractExecuteFcn(walletData, contractAddress);

			if (txHash === undefined || finalCount === undefined) {
			} else {
				setExecuteTextSt(`Count is: ${finalCount} | Transaction hash: ${txHash} ✅`);
				setExecuteLinkSt(`https://hashscan.io/${network}/tx/${txHash}`);
			}
		}
	}

	async function mintNFT() {
		
		const provider = walletData[1];
		const signer = provider.getSigner();

		let txHash;
		try {
			console.log('Minting')

			const gasLimit = 600000;
			const NFTcontract = new ethers.Contract(NFTaddress, NFTabi, signer);
			const mintTx = await NFTcontract.safeMint('ipfs',{ gasLimit: gasLimit });
			const mintRx = await mintTx.wait();
			txHash = mintRx.transactionHash;

			// CHECK SMART CONTRACT STATE AGAIN
			console.log(`- Contract executed. Transaction hash: \n${txHash} ✅`);
		} catch (executeError) {
			console.log(`- ${executeError.message.toString()}`);
		}
	}

	return (
		<Router>
			<div className="App">
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/raffle" element={<Raffle />} />
				</Routes>
				<MyGroup fcn={connectWallet} buttonLabel={"Connect Wallet"} link={connectLinkSt} />
				<MyGroup fcn={contractDeploy} buttonLabel={"Deploy Contract"} text={contractTextSt} link={contractLinkSt} />
				<MyGroup fcn={contractExecute} buttonLabel={"Execute Contract (+1)"} text={executeTextSt} link={executeLinkSt} />
				<button onClick={mintNFT}>MINT NFT</button>
			</div>
		</Router>
	);
}
export default App;
