const {
    Client,
    Hbar,
    TopicMessageSubmitTransaction,
    TopicCreateTransaction
} = require("@hashgraph/sdk");
require("dotenv").config();

async function environmentSetup() {

    const myAccountId = process.env.MY_ACCOUNT_ID;
    const myPrivateKey = process.env.MY_PRIVATE_KEY;

    const client = Client.forTestnet();
    client.setOperator(myAccountId, myPrivateKey);
    client.setDefaultMaxTransactionFee(new Hbar(100));
    client.setMaxQueryPayment(new Hbar(50));

    const topicId = "0.0.644582";
    // console.log(Cl)
    // WRITING MESSAGE

    async function writeMessage(_message) {
        
        let sendResponse = await new TopicMessageSubmitTransaction({
            topicId: topicId,
            message: _message,
        }).execute(client);

        // Get the receipt of the transaction
        const getReceipt = await sendResponse.getReceipt(client);

        // Get the status of the transaction
        const transactionStatus = getReceipt.status
        console.log("The message transaction status " + transactionStatus.toString())
    }

    // writeMessage("Write message from function");
    const url = "https://testnet.mirrornode.hedera.com/api/v1/topics/0.0.644582/messages";



    async function query(){
        const  data = await (await fetch(url)).json();
        var b = Buffer.from(data.messages[0], 'base64')
        var s = b.toString();
        console.log(data.messages.length);
    }
    query();


}
environmentSetup()



// CODE for spliting the message

// const inputString = "Type:open,token_id:1,account:0x123";
// const pairs = inputString.split(',');
// const dataObject = {};
// for (const pair of pairs) {
//     const [key, value] = pair.split(':');
//     dataObject[key] = value;
// }
// const formattedObject = {};
// for (const key in dataObject) {
//     formattedObject[key.charAt(0).toUpperCase() + key.slice(1)] = dataObject[key];
// }
// console.log(formattedObject.Type);
