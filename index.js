
const MY_ACCOUNT_ID = '0.0.574650';
const MY_PRIVATE_KEY = '3030020100300706052b8104000a04220420979a22c035e7e976fe43e37d1c19f786d3666bfa339af957d9c4e2ce95d0362e'
const { Client, PrivateKey, TopicCreateTransaction, AccountBalanceQuery, Hbar, TransferTransaction } = require("@hashgraph/sdk");
async function environmentSetup() {

    const client = Client.forTestnet();

    client.setOperator(MY_ACCOUNT_ID, MY_PRIVATE_KEY);
    client.setDefaultMaxTransactionFee(new Hbar(100));
    client.setMaxQueryPayment(new Hbar(50));


    let txResponse = await new TopicCreateTransaction().execute(client);

    let receipt = await txResponse.getReceipt(client);
    let topicId = receipt.topicId;
    console.log(`Your topic ID is: ${topicId}`);

    await new Promise((resolve) => setTimeout(resolve, 5000));
}
environmentSetup()
