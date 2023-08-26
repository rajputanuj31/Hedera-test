
const MY_ACCOUNT_ID = '0.0.574650';
const MY_PRIVATE_KEY = '3030020100300706052b8104000a04220420979a22c035e7e976fe43e37d1c19f786d3666bfa339af957d9c4e2ce95d0362e'
const { Client, PrivateKey, TopicMessageSubmitTransaction, AccountBalanceQuery, Hbar, TransferTransaction } = require("@hashgraph/sdk");
async function environmentSetup() {

    const client = Client.forTestnet();

    client.setOperator(MY_ACCOUNT_ID, MY_PRIVATE_KEY);
    client.setDefaultMaxTransactionFee(new Hbar(100));
    client.setMaxQueryPayment(new Hbar(50));

    const topicId = "0.0.1074528";
    const _message = 'current:open,tokenId:0,amount:1000000000000000,creator:${walletData[0]},image:${ipfsHash}'
    let sendResponse = await new TopicMessageSubmitTransaction({
        topicId: topicId,
        message: "Hello, HCS!",
    }).execute(client);
    
    // Get the receipt of the transaction
    const getReceipt = await sendResponse.getReceipt(client);
    
    // Get the status of the transaction
    const transactionStatus = getReceipt.status
    console.log("The message transaction status " + transactionStatus.toString());


}
environmentSetup()
