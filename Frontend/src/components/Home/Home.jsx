import React, { useState } from "react";
import "./Home.css"

const Home = ({connectTextSt}) => {
	const API_KEY = "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";
	
	const [inputtext, setInputtext] = useState("")
	const [imageurl, setImageUrl] = useState("");
	const handleInputChange = (event) => {
		setInputtext(event.target.value);
	}
	const getImages = async () => {
		const options = {
			method: "POST",
			headers: {
				"Authorization": `Bearer ${API_KEY}`,
				'Content-Type': "application/json"
			},
			body: JSON.stringify({
				"prompt": inputtext,
				"n": 1,
				"size": "1024x1024"
			})
		}
		try {
			const response = await fetch('https://api.openai.com/v1/images/generations', options);
			const details = await response.json();
			setImageUrl(details.data[0].url);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div className="home">
			<p>{connectTextSt}</p>
			<input type="text" name="name" className="inp" value={inputtext} onChange={handleInputChange} placeholder="Enter to Generate NFT"/>
			<button className="cta-button" onClick={getImages}>Generate NFT</button>
			{imageurl && <img src={imageurl} alt="" style={{ width: "300px", height: "300px" }} />}
		</div>
	);
}
export default Home;
