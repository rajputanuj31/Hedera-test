import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MoralisProvider } from "react-moralis";

ReactDOM.render(
	<MoralisProvider initializeOnMount={false}>

	
	<React.StrictMode>
		<App />
	</React.StrictMode>
	</MoralisProvider>
	,
	
	document.getElementById("root")
);
