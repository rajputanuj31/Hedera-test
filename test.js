// Use the api keys by providing the strings directly 
const pinataSDK = require('@pinata/sdk');
const pinata = new pinataSDK('', '');
const test = async ()=>{
    const body = {
        message: 'Pinatas are awesome'
    };
    const options = {
        pinataMetadata: {
            name: "MyCustomName",
            keyvalues: {
                customKey: 'customValue',
                customKey2: 'customValue2'
            }
        },
        pinataOptions: {
            cidVersion: 0
        }
    };
    const res = await pinata.pinJSONToIPFS(body, options)
    console.log(res)
}

test();

