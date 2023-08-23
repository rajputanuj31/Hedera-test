import React, { useState } from "react";
import "./Home.css"
import axios from 'axios';
import axiosRetry from 'axios-retry';
const FormData = require("form-data");
const JWT = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkM2IyYTM0NS05YTNjLTRhYTYtYmE3ZC04YjA1YzRjZDg2MTIiLCJlbWFpbCI6InJhanB1dGFudWowNDFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjY3MTk4ODQzOWQwMzRkYTI3ZDc0Iiwic2NvcGVkS2V5U2VjcmV0IjoiODU2NmM1NGEyYTVmZjk5YTUyMjBhYmJlN2NmMmQ4NmQ3NDM2OGJiNzIxYjg0MmI2ZjMzZTRjNTIxYjliZGNmMCIsImlhdCI6MTY5MjY5MzUwMH0.v6OpQvIiZImDDW_w0p08QQLfpKaO_bhjhBYIDBI2zIc`


const Home = () => {
	const API_KEY = "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";

	const [inputtext, setInputtext] = useState("")
	const [imageurl, setImageUrl] = useState("");
	const [isLoading, setIsLoading] = useState(false);

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
		const sourceUrl = "https://bellard.org/bpg/2.png";
		fetch(sourceUrl)
			.then(response => {
				if (!response.ok) {
					throw new Error('HTTP Error!');
				}
				return response.blob();
			})
			.then(blobData => {
				console.log('Image as Blob: ', blobData);
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
				async function helper() {
					const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
						maxBodyLength: "Infinity",
						headers: {
							'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
							'Authorization': `Bearer ${JWT}`
						}
					});
					console.log(res.data);
				}
				helper();
			})
	
	}


	return (
		<div className="home">
			<input type="text" name="name" className="inp" value={inputtext} onChange={handleInputChange} placeholder="Enter to Generate NFT" autoComplete="off" />
			<button className="cta-button" onClick={hello}>Pinata</button>
			{imageurl ? (
				<img src={imageurl} alt=""/>
			) : (
				<p>{isLoading ? 'Please wait...' : 'Image yahan par aayegi'}</p>
			)}

		</div>
	);
}
export default Home;
