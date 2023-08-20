// import bytecode from "./bytecode";
const bytecode = require("./bytecode")
const {
    Client,
    PrivateKey,
    AccountCreateTransaction,
    AccountBalanceQuery,
    ContractCreateFlow,
    Hbar,
    FileCreateTransaction,
    TransferTransaction,
} = require("@hashgraph/sdk");

console.log(bytecode)

require("dotenv").config();


async function environmentSetup() {

    const myAccountId = process.env.MY_ACCOUNT_ID;
    const myPrivateKey = process.env.MY_PRIVATE_KEY;

    if (!myAccountId || !myPrivateKey) {
        throw new Error(
            "Environment variables MY_ACCOUNT_ID and MY_PRIVATE_KEY must be present"
        );
    }

    const client = Client.forTestnet();

    client.setOperator(myAccountId, myPrivateKey);

    client.setDefaultMaxTransactionFee(new Hbar(100));

    client.setMaxQueryPayment(new Hbar(50));

    const contractCreate = new ContractCreateFlow()
        .setGas(500000)
        .setBytecode(bytecode);

    //Sign the transaction with the client operator key and submit to a Hedera network
    const txResponse = contractCreate.execute(client);
    console.log("TRANSACTION RES : ", txResponse);

    //Get the receipt of the transaction
    const receipt = (await txResponse).getReceipt(client);
    console.log("Receipt : ",receipt)
    //Get the new contract ID
    const newContractId = (await receipt).contractId;

    //Log the file ID
    console.log("The smart contract byte code file ID is " + newContractId)
}
environmentSetup();
