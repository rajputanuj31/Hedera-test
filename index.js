const API_KEY = "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";
const btn = document.querySelector(".btn");

const getImages = async () =>{
    const options ={
        method:"POST",
        headers:{
            "Authorization": `Bearer ${API_KEY}`,
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            "prompt":'NFT dog',
            "n":1,
            "size":"1024x1024"
        })
    }
    try {
        const response = await fetch('https://api.openai.com/v1/images/generations',options);
        const data = await response.json();
        console.log(data);
        console.log("hellooo");
    } catch (error) {
        console.error(error);
    }
}

btn.addEventListener('click',getImages);