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
        .setBytecode("608060405260006009556000600a553480156200001b57600080fd5b506040518060400160405280600981526020017f41492050726f6d707400000000000000000000000000000000000000000000008152506040518060400160405280600381526020017f41495000000000000000000000000000000000000000000000000000000000008152508160009080519060200190620000a0929190620000c2565b508060019080519060200190620000b9929190620000c2565b505050620001d7565b828054620000d090620001a1565b90600052602060002090601f016020900481019282620000f4576000855562000140565b82601f106200010f57805160ff191683800117855562000140565b8280016001018555821562000140579182015b828111156200013f57825182559160200191906001019062000122565b5b5090506200014f919062000153565b5090565b5b808211156200016e57600081600090555060010162000154565b5090565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620001ba57607f821691505b60208210811415620001d157620001d062000172565b5b50919050565b61310080620001e76000396000f3fe6080604052600436106101355760003560e01c806356189236116100ab57806395d89b411161006f57806395d89b4114610461578063a22cb4651461048c578063b88d4fde146104b5578063c1e3bd3e146104de578063c87b56dd1461051b578063e985e9c51461055857610135565b80635618923614610342578063602d13f51461036d5780636352211e146103aa57806370a08231146103e75780637bc407f41461042457610135565b8063239bb59a116100fd578063239bb59a1461024557806323b872dd1461026e5780632e519f9014610297578063336f173b146102b357806340d097c3146102f057806342842e0e1461031957610135565b806301ffc9a71461013a57806302812aeb1461017757806306fdde03146101b4578063081812fc146101df578063095ea7b31461021c575b600080fd5b34801561014657600080fd5b50610161600480360381019061015c91906121ce565b610595565b60405161016e9190612216565b60405180910390f35b34801561018357600080fd5b5061019e60048036038101906101999190612267565b610677565b6040516101ab91906122a3565b60405180910390f35b3480156101c057600080fd5b506101c96106f6565b6040516101d69190612357565b60405180910390f35b3480156101eb57600080fd5b5061020660048036038101906102019190612267565b610788565b60405161021391906123ba565b60405180910390f35b34801561022857600080fd5b50610243600480360381019061023e9190612401565b6107ce565b005b34801561025157600080fd5b5061026c60048036038101906102679190612441565b6108e6565b005b34801561027a57600080fd5b5061029560048036038101906102909190612494565b610a28565b005b6102b160048036038101906102ac9190612267565b610a88565b005b3480156102bf57600080fd5b506102da60048036038101906102d59190612267565b610c75565b6040516102e791906122a3565b60405180910390f35b3480156102fc57600080fd5b50610317600480360381019061031291906124e7565b610cf4565b005b34801561032557600080fd5b50610340600480360381019061033b9190612494565b610d18565b005b34801561034e57600080fd5b50610357610d38565b60405161036491906122a3565b60405180910390f35b34801561037957600080fd5b50610394600480360381019061038f9190612267565b610d42565b6040516103a191906123ba565b60405180910390f35b3480156103b657600080fd5b506103d160048036038101906103cc9190612267565b610d7f565b6040516103de91906123ba565b60405180910390f35b3480156103f357600080fd5b5061040e600480360381019061040991906124e7565b610e06565b60405161041b91906122a3565b60405180910390f35b34801561043057600080fd5b5061044b60048036038101906104469190612267565b610ebe565b60405161045891906122a3565b60405180910390f35b34801561046d57600080fd5b50610476610f3d565b6040516104839190612357565b60405180910390f35b34801561049857600080fd5b506104b360048036038101906104ae9190612540565b610fcf565b005b3480156104c157600080fd5b506104dc60048036038101906104d791906126b5565b610fe5565b005b3480156104ea57600080fd5b5061050560048036038101906105009190612267565b611047565b60405161051291906127f6565b60405180910390f35b34801561052757600080fd5b50610542600480360381019061053d9190612267565b61114a565b60405161054f9190612357565b60405180910390f35b34801561056457600080fd5b5061057f600480360381019061057a9190612818565b6111b2565b60405161058c9190612216565b60405180910390f35b60007f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061066057507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b80610670575061066f82611246565b5b9050919050565b6000600660006007600085815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600401549050919050565b60606000805461070590612887565b80601f016020809104026020016040519081016040528092919081815260200182805461073190612887565b801561077e5780601f106107535761010080835404028352916020019161077e565b820191906000526020600020905b81548152906001019060200180831161076157829003601f168201915b5050505050905090565b6000610793826112b0565b6004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60006107d982610d7f565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16141561084a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108419061292b565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff166108696112fb565b73ffffffffffffffffffffffffffffffffffffffff1614806108985750610897816108926112fb565b6111b2565b5b6108d7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108ce906129bd565b60405180910390fd5b6108e18383611303565b505050565b6108ee612031565b8381600001818152505082816040018181525050818160200181815250503360076000600954815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506001600960008282546109739190612a0c565b9250508190555080600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000155602082015181600101556040820151816002015560608201518160030160006101000a81548160ff0219169083151502179055506080820151816004015560a0820151816005019080519060200190610a1e929190612069565b5090505050505050565b610a39610a336112fb565b826113bc565b610a78576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a6f90612ad4565b60405180910390fd5b610a83838383611451565b505050565b60006007600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690506000600660008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508060010154341015610b4a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b4190612b40565b60405180910390fd5b600081600501905080339080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508082600501908054610bc79291906120f3565b5034600860008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610c139190612a0c565b600860008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555060018260040154610c679190612a0c565b826004018190555050505050565b6000600660006007600085815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001549050919050565b610d0081600a5461174b565b6001600a54610d0f9190612a0c565b600a8190555050565b610d3383838360405180602001604052806000815250610fe5565b505050565b6000600a54905090565b60006007600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b600080610d8b83611769565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610dfd576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610df490612bac565b60405180910390fd5b80915050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610e77576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e6e90612c3e565b60405180910390fd5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6000600660006007600085815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101549050919050565b606060018054610f4c90612887565b80601f0160208091040260200160405190810160405280929190818152602001828054610f7890612887565b8015610fc55780601f10610f9a57610100808354040283529160200191610fc5565b820191906000526020600020905b815481529060010190602001808311610fa857829003601f168201915b5050505050905090565b610fe1610fda6112fb565b83836117a6565b5050565b610ff6610ff06112fb565b836113bc565b611035576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161102c90612ad4565b60405180910390fd5b61104184848484611913565b50505050565b6060600660006007600085815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060050180548060200260200160405190810160405280929190818152602001828054801561113e57602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190600101908083116110f4575b50505050509050919050565b6060611155826112b0565b600061115f61196f565b9050600081511161117f57604051806020016040528060008152506111aa565b8061118984611986565b60405160200161119a929190612c9a565b6040516020818303038152906040525b915050919050565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b6112b981611a5e565b6112f8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112ef90612bac565b60405180910390fd5b50565b600033905090565b816004600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff1661137683610d7f565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000806113c883610d7f565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16148061140a575061140981856111b2565b5b8061144857508373ffffffffffffffffffffffffffffffffffffffff1661143084610788565b73ffffffffffffffffffffffffffffffffffffffff16145b91505092915050565b8273ffffffffffffffffffffffffffffffffffffffff1661147182610d7f565b73ffffffffffffffffffffffffffffffffffffffff16146114c7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114be90612d30565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611537576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161152e90612dc2565b60405180910390fd5b6115448383836001611a9f565b8273ffffffffffffffffffffffffffffffffffffffff1661156482610d7f565b73ffffffffffffffffffffffffffffffffffffffff16146115ba576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115b190612d30565b60405180910390fd5b6004600082815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556001600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055506001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540192505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a46117468383836001611aa5565b505050565b611765828260405180602001604052806000815250611aab565b5050565b60006002600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415611815576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161180c90612e2e565b60405180910390fd5b80600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31836040516119069190612216565b60405180910390a3505050565b61191e848484611451565b61192a84848484611b06565b611969576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161196090612ec0565b60405180910390fd5b50505050565b606060405180602001604052806000815250905090565b60606000600161199584611c9d565b01905060008167ffffffffffffffff8111156119b4576119b361258a565b5b6040519080825280601f01601f1916602001820160405280156119e65781602001600182028036833780820191505090505b509050600082602001820190505b600115611a53578080600190039150507f3031323334353637383961626364656600000000000000000000000000000000600a86061a8153600a8581611a3d57611a3c612ee0565b5b0494506000851415611a4e57611a53565b6119f4565b819350505050919050565b60008073ffffffffffffffffffffffffffffffffffffffff16611a8083611769565b73ffffffffffffffffffffffffffffffffffffffff1614159050919050565b50505050565b50505050565b611ab58383611df0565b611ac26000848484611b06565b611b01576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611af890612ec0565b60405180910390fd5b505050565b6000611b278473ffffffffffffffffffffffffffffffffffffffff1661200e565b15611c90578373ffffffffffffffffffffffffffffffffffffffff1663150b7a02611b506112fb565b8786866040518563ffffffff1660e01b8152600401611b729493929190612f64565b602060405180830381600087803b158015611b8c57600080fd5b505af1925050508015611bbd57506040513d601f19601f82011682018060405250810190611bba9190612fc5565b60015b611c40573d8060008114611bed576040519150601f19603f3d011682016040523d82523d6000602084013e611bf2565b606091505b50600081511415611c38576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611c2f90612ec0565b60405180910390fd5b805181602001fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614915050611c95565b600190505b949350505050565b600080600090507a184f03e93ff9f4daa797ed6e38ed64bf6a1f0100000000000000008310611cfb577a184f03e93ff9f4daa797ed6e38ed64bf6a1f0100000000000000008381611cf157611cf0612ee0565b5b0492506040810190505b6d04ee2d6d415b85acef81000000008310611d38576d04ee2d6d415b85acef81000000008381611d2e57611d2d612ee0565b5b0492506020810190505b662386f26fc100008310611d6757662386f26fc100008381611d5d57611d5c612ee0565b5b0492506010810190505b6305f5e1008310611d90576305f5e1008381611d8657611d85612ee0565b5b0492506008810190505b6127108310611db5576127108381611dab57611daa612ee0565b5b0492506004810190505b60648310611dd85760648381611dce57611dcd612ee0565b5b0492506002810190505b600a8310611de7576001810190505b80915050919050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611e60576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611e579061303e565b60405180910390fd5b611e6981611a5e565b15611ea9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611ea0906130aa565b60405180910390fd5b611eb7600083836001611a9f565b611ec081611a5e565b15611f00576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611ef7906130aa565b60405180910390fd5b6001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540192505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a461200a600083836001611aa5565b5050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b6040518060c0016040528060008152602001600081526020016000815260200160001515815260200160008152602001606081525090565b8280548282559060005260206000209081019282156120e2579160200282015b828111156120e15782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555091602001919060010190612089565b5b5090506120ef9190612145565b5090565b8280548282559060005260206000209081019282156121345760005260206000209182015b82811115612133578254825591600101919060010190612118565b5b5090506121419190612145565b5090565b5b8082111561215e576000816000905550600101612146565b5090565b6000604051905090565b600080fd5b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b6121ab81612176565b81146121b657600080fd5b50565b6000813590506121c8816121a2565b92915050565b6000602082840312156121e4576121e361216c565b5b60006121f2848285016121b9565b91505092915050565b60008115159050919050565b612210816121fb565b82525050565b600060208201905061222b6000830184612207565b92915050565b6000819050919050565b61224481612231565b811461224f57600080fd5b50565b6000813590506122618161223b565b92915050565b60006020828403121561227d5761227c61216c565b5b600061228b84828501612252565b91505092915050565b61229d81612231565b82525050565b60006020820190506122b86000830184612294565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b838110156122f85780820151818401526020810190506122dd565b83811115612307576000848401525b50505050565b6000601f19601f8301169050919050565b6000612329826122be565b61233381856122c9565b93506123438185602086016122da565b61234c8161230d565b840191505092915050565b60006020820190508181036000830152612371818461231e565b905092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006123a482612379565b9050919050565b6123b481612399565b82525050565b60006020820190506123cf60008301846123ab565b92915050565b6123de81612399565b81146123e957600080fd5b50565b6000813590506123fb816123d5565b92915050565b600080604083850312156124185761241761216c565b5b6000612426858286016123ec565b925050602061243785828601612252565b9150509250929050565b60008060006060848603121561245a5761245961216c565b5b600061246886828701612252565b935050602061247986828701612252565b925050604061248a86828701612252565b9150509250925092565b6000806000606084860312156124ad576124ac61216c565b5b60006124bb868287016123ec565b93505060206124cc868287016123ec565b92505060406124dd86828701612252565b9150509250925092565b6000602082840312156124fd576124fc61216c565b5b600061250b848285016123ec565b91505092915050565b61251d816121fb565b811461252857600080fd5b50565b60008135905061253a81612514565b92915050565b600080604083850312156125575761255661216c565b5b6000612565858286016123ec565b92505060206125768582860161252b565b9150509250929050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6125c28261230d565b810181811067ffffffffffffffff821117156125e1576125e061258a565b5b80604052505050565b60006125f4612162565b905061260082826125b9565b919050565b600067ffffffffffffffff8211156126205761261f61258a565b5b6126298261230d565b9050602081019050919050565b82818337600083830152505050565b600061265861265384612605565b6125ea565b90508281526020810184848401111561267457612673612585565b5b61267f848285612636565b509392505050565b600082601f83011261269c5761269b612580565b5b81356126ac848260208601612645565b91505092915050565b600080600080608085870312156126cf576126ce61216c565b5b60006126dd878288016123ec565b94505060206126ee878288016123ec565b93505060406126ff87828801612252565b925050606085013567ffffffffffffffff8111156127205761271f612171565b5b61272c87828801612687565b91505092959194509250565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b61276d81612399565b82525050565b600061277f8383612764565b60208301905092915050565b6000602082019050919050565b60006127a382612738565b6127ad8185612743565b93506127b883612754565b8060005b838110156127e95781516127d08882612773565b97506127db8361278b565b9250506001810190506127bc565b5085935050505092915050565b600060208201905081810360008301526128108184612798565b905092915050565b6000806040838503121561282f5761282e61216c565b5b600061283d858286016123ec565b925050602061284e858286016123ec565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061289f57607f821691505b602082108114156128b3576128b2612858565b5b50919050565b7f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560008201527f7200000000000000000000000000000000000000000000000000000000000000602082015250565b60006129156021836122c9565b9150612920826128b9565b604082019050919050565b6000602082019050818103600083015261294481612908565b9050919050565b7f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60008201527f6b656e206f776e6572206f7220617070726f76656420666f7220616c6c000000602082015250565b60006129a7603d836122c9565b91506129b28261294b565b604082019050919050565b600060208201905081810360008301526129d68161299a565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000612a1782612231565b9150612a2283612231565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115612a5757612a566129dd565b5b828201905092915050565b7f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560008201527f72206f7220617070726f76656400000000000000000000000000000000000000602082015250565b6000612abe602d836122c9565b9150612ac982612a62565b604082019050919050565b60006020820190508181036000830152612aed81612ab1565b9050919050565b7f4c657373207468616e207265717569726520616d6f756e742073656e74000000600082015250565b6000612b2a601d836122c9565b9150612b3582612af4565b602082019050919050565b60006020820190508181036000830152612b5981612b1d565b9050919050565b7f4552433732313a20696e76616c696420746f6b656e2049440000000000000000600082015250565b6000612b966018836122c9565b9150612ba182612b60565b602082019050919050565b60006020820190508181036000830152612bc581612b89565b9050919050565b7f4552433732313a2061646472657373207a65726f206973206e6f74206120766160008201527f6c6964206f776e65720000000000000000000000000000000000000000000000602082015250565b6000612c286029836122c9565b9150612c3382612bcc565b604082019050919050565b60006020820190508181036000830152612c5781612c1b565b9050919050565b600081905092915050565b6000612c74826122be565b612c7e8185612c5e565b9350612c8e8185602086016122da565b80840191505092915050565b6000612ca68285612c69565b9150612cb28284612c69565b91508190509392505050565b7f4552433732313a207472616e736665722066726f6d20696e636f72726563742060008201527f6f776e6572000000000000000000000000000000000000000000000000000000602082015250565b6000612d1a6025836122c9565b9150612d2582612cbe565b604082019050919050565b60006020820190508181036000830152612d4981612d0d565b9050919050565b7f4552433732313a207472616e7366657220746f20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b6000612dac6024836122c9565b9150612db782612d50565b604082019050919050565b60006020820190508181036000830152612ddb81612d9f565b9050919050565b7f4552433732313a20617070726f766520746f2063616c6c657200000000000000600082015250565b6000612e186019836122c9565b9150612e2382612de2565b602082019050919050565b60006020820190508181036000830152612e4781612e0b565b9050919050565b7f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560008201527f63656976657220696d706c656d656e7465720000000000000000000000000000602082015250565b6000612eaa6032836122c9565b9150612eb582612e4e565b604082019050919050565b60006020820190508181036000830152612ed981612e9d565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600081519050919050565b600082825260208201905092915050565b6000612f3682612f0f565b612f408185612f1a565b9350612f508185602086016122da565b612f598161230d565b840191505092915050565b6000608082019050612f7960008301876123ab565b612f8660208301866123ab565b612f936040830185612294565b8181036060830152612fa58184612f2b565b905095945050505050565b600081519050612fbf816121a2565b92915050565b600060208284031215612fdb57612fda61216c565b5b6000612fe984828501612fb0565b91505092915050565b7f4552433732313a206d696e7420746f20746865207a65726f2061646472657373600082015250565b60006130286020836122c9565b915061303382612ff2565b602082019050919050565b600060208201905081810360008301526130578161301b565b9050919050565b7f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000600082015250565b6000613094601c836122c9565b915061309f8261305e565b602082019050919050565b600060208201905081810360008301526130c381613087565b905091905056fea2646970667358221220ac3f7b9ad2cf78391c3e6c8ca7f6eedd5556b4ddb701e8e4c7da66876f0ca63a64736f6c63430008090033");

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
