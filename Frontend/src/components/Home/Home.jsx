import React, { useState } from "react";
import "./Home.css"

const Home = () => {
	const API_KEY = "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";

	const [inputtext, setInputtext] = useState("")
	const [imageurl, setImageUrl] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleInputChange = (event) => {
		setInputtext(event.target.value);
	}

	const getImages = async () => {
		setIsLoading(true);
		const options = {
			method: "POST",
			headers: {
				"Authorization": `Bearer ${API_KEY}`,
				'Content-Type': "application/json"
			},
			body: JSON.stringify({
				"prompt": inputtext,
				"n": 1,
				"size": "512x512"
			})
		}
		try {
			const response = await fetch('https://api.openai.com/v1/images/generations', options);
			const details = await response.json();
			setImageUrl(details.data[0].url);
			await setIsLoading(false);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div className="home">
			<input type="text" name="name" className="inp" value={inputtext} onChange={handleInputChange} placeholder="Enter to Generate NFT" autoComplete="off" />
			<button className="cta-button" onClick={getImages}>Generate NFT</button>
			{imageurl ? (
				<img src={imageurl} alt=""/>
			) : (
				<p>{isLoading ? 'Please wait...' : 'Image yahan par aayegi'}</p>
			)}

		</div>
	);
}
export default Home;
