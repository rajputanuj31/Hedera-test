import React, { useState } from "react";
import "./Home.css"
import axios from 'axios';
import axiosRetry from 'axios-retry';
const FormData = require("form-data");
const API_TOKEN = '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'
const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0MjQyZTQzYi0zODNiLTRhYjUtYWE1NC04YTc1MzIzYTY4NDQiLCJlbWFpbCI6ImFzaHV0b3NoMjZqaGFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImI2NzI4ZDNmNWRjNjhjMzRhNWY4Iiwic2NvcGVkS2V5U2VjcmV0IjoiZGM3OTJkYjZhNzVkOTI5Y2MyNDllOGZkZDE2MGFhZDI3OGQwMmI1MmJmY2Y2OTQ1NTM4NDM4MjJkMjBiOTQwOSIsImlhdCI6MTY5MjgwNzQ2M30.c4mAp57G4DXIOvuMnYCtheJl6oO2MXMqJse49KSrXYo';

const Home = () => {
	const API_KEY = "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";

	const [inputtext, setInputtext] = useState("")
	const [imageurl, setImageUrl] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [hash,setHash] = useState("");

	const handleInputChange = (event) => {
		setInputtext(event.target.value);
	}

	// const getImages = async () => {
	// 	setIsLoading(true);
	// 	const options = {
	// 		method: "POST",
	// 		headers: {
	// 			"Authorization": `Bearer ${API_KEY}`,
	// 			'Content-Type': "application/json"
	// 		},
	// 		body: JSON.stringify({
	// 			"prompt": inputtext,
	// 			"n": 1,
	// 			"size": "512x512"
	// 		})
	// 	}
	// 	try {
	// 		const response = await fetch('https://api.openai.com/v1/images/generations', options);
	// 		const details = await response.json();
	// 		setImageUrl(details.data[0].url);
	// 		console.log(details.data[0].url);
	// 		await setIsLoading(false);
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// }


	async function hello() {
		const input = inputtext;
		const response = await fetch(
			"https://api-inference.huggingface.co/models/prompthero/openjourney",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${API_TOKEN}`,
				},
				body: JSON.stringify({ inputs: input }),
			}
		);

		if (!response.ok) {
			throw new Error("Failed to generate image");
		}

		const blobData = await response.blob();
		console.log(blobData);

		const formData = new FormData();
		formData.append('file', blobData);
		const pinataMetadata = JSON.stringify({
			name: 'IMAGE',
		});
		formData.append('pinataMetadata', pinataMetadata);
		const pinataOptions = JSON.stringify({
			cidVersion: 0,
		})
		formData.append('pinataOptions', pinataOptions);

		const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
			maxBodyLength: "Infinity",
			headers: {
				'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
				'Authorization': `Bearer ${JWT}`
			}
		});
		setHash(res.data.IpfsHash);
		console.log(res.data.IpfsHash);



	}


	return (
		<div className="home">
			<input type="text" name="name" className="inp" value={inputtext} onChange={handleInputChange} placeholder="Enter to Generate NFT" autoComplete="off" />
			<button className="cta-button" onClick={hello}>Pinata</button>
			{imageurl ? (
				<img src={imageurl} alt="" />
			) : (
				<p>{isLoading ? 'Please wait...' : 'Image yahan par aayegi'}</p>
			)}

		</div>
	);
}
export default Home;
