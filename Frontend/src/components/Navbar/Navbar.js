import "./Navbar.css"
import React, { useState } from "react"
import MyGroup from "../MyGroup";
import walletConnectFcn from "../hedera/walletConnect";

const Navbar = () => {
    const [walletData, setWalletData] = useState();
	const [account, setAccount] = useState();
	const [network, setNetwork] = useState();
	const [connectTextSt, setConnectTextSt] = useState("Connect here...");
	const [contractTextSt, setContractTextSt] = useState();
	const [text,setText] = useState("Connect Wallet");

	const [connectLinkSt, setConnectLinkSt] = useState("");

    async function connectWallet() {
		if (account !== undefined) {
			setConnectTextSt(`🔌 Account ${account} already connected ⚡ ✅`);
		} else {
			const wData = await walletConnectFcn();

			let newAccount = wData[0];
			let newNetwork = wData[2];
			if (newAccount !== undefined) {
				setConnectTextSt(`🔌 Account ${newAccount} connected ⚡ ✅`);
				setConnectLinkSt(`https://hashscan.io/${newNetwork}/account/${newAccount}`);

				setWalletData(wData);
				setAccount(newAccount);
				setNetwork(newNetwork);
				setContractTextSt();
				setText("Connected");
			}
		}
	}

return (
    <div className="Nav" id="Navbar">
            <h1>Project_Name</h1>
        <ul className="Nav-menu">
                <li>Raffles</li>
            <MyGroup fcn={connectWallet} buttonLabel={text}  link={connectLinkSt} />
        </ul>
      

    </div>
)
}

export default Navbar
