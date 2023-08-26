import { client, url, topicId } from './helper'
import { ethers } from "ethers";
import { useEffect, useState } from 'react';
import { Buffer } from 'buffer';
import sampleImage from './sample.png';
import AIabi from "../contracts/AIabi.js";
import NFTabi from '../contracts/NFTabi'
import hederaImage from './hedera.png';
import walletConnectFcn from "../components/hedera/walletConnect";
const AIaddress = '0x30CA0bb56d58c01E702B1b49895d5cB5249F76f1';
const NFTaddress = '0xb39C1Ae40746F96be59d11C42e26a24EbdA154Ce';

export default function () {

    const [raffleDetails, setRaffleDetails] = useState([]);
    const [walletData, setWalletData] = useState([]);
    const [tokenID, setTokenID] = useState('');
    const [amount, setAmount] = useState('');
    const [NFTaddressInput, setNFTaddressInput] = useState('');
    const [winner, setWinner] = useState('Not Decided');
    const [particpation, setParticipation] = useState(false);

    useEffect(() => {

        const toggleButton = document.getElementById('toggleButton');
        const textFields = document.getElementById('textFields');

        toggleButton.addEventListener('click', () => {
            if (toggleButton.innerHTML === '+') {
                // toggleButton.style.transform = 'rotate(45deg)';
                toggleButton.innerHTML = '&#10005;';
                toggleButton.style.fontSize = '20px';

                textFields.style.display = 'flex';
                setTimeout(() => {
                    textFields.style.opacity = '1';
                }, 10);
            } else {
                // toggleButton.style.transform = 'rotate(90deg)';
                toggleButton.innerHTML = '+';
                textFields.style.opacity = '0';
                toggleButton.style.fontSize = '35px';

                setTimeout(() => {
                    textFields.style.display = 'none';
                }, 300);
            }
        });

        async function getHedera() {

            let fill = [];
            const data = await (await fetch(url)).json();

            for (let i = 0; i < data.messages.length; i++) {

                var b = Buffer.from(data.messages[i].message, 'base64')
                var inputString = b.toString();

                const pairs = inputString.split(',');
                const dataObject = {};
                for (const pair of pairs) {
                    const [key, value] = pair.split(':');
                    dataObject[key] = value;
                }
                const formattedObject = {};
                for (const key in dataObject) {
                    formattedObject[key.charAt(0).toUpperCase() + key.slice(1)] = dataObject[key];
                }

                fill.push(formattedObject)
            }
            setRaffleDetails(fill);
            console.log(fill)
        }
        getHedera();

        async function walletData() {
            const wData = await walletConnectFcn();
            console.log(wData)
            setWalletData(wData);
            const provider = wData[1];
            const signer = provider.getSigner();
            console.log(signer)
            const gasLimit = 600000;

        }

        walletData();
    }, [])

    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [activePopupIndex, setActivePopupIndex] = useState(null);
    const [participants, setParticipants] = useState('');

    const handleButtonClick = (index) => {
        setActivePopupIndex(index);
    };

    const handleClosePopup = () => {
        setActivePopupIndex(null);
    };

    async function handleSubmit() {
        const provider = walletData[1];
        const signer = provider.getSigner();

        let txHash;
        try {

            const NFTcontract = new ethers.Contract(NFTaddressInput, NFTabi, signer);
            const createApproveTx = await NFTcontract.setApprovalForAll(AIaddress, true);
            const approveRx = await createApproveTx.wait()

            console.log(approveRx)

            const gasLimit = 600000;
            const AIcontract = new ethers.Contract(AIaddress, AIabi, signer);

            const createTx = await AIcontract.createRaffle(parseInt(tokenID), amount, NFTaddressInput, { gasLimit: gasLimit });
            const mintRx = await createTx.wait();
            console.log(createTx)
            txHash = mintRx.transactionHash;

            // CHECK SMART CONTRACT STATE AGAIN
            console.log(`- Contract executed. Transaction hash: \n${txHash} ✅`);
        } catch (executeError) {
            console.log(`- ${executeError}`);
        }
    }

    async function enterRaffle(raffleId, amount) {
        const provider = walletData[1];
        const signer = provider.getSigner();
        const gasLimit = 600000;
        console.log(amount)
        try {
            const AIcontract = new ethers.Contract(AIaddress, AIabi, signer);
            const createTx = await AIcontract.enterRaffle(parseInt(raffleId), { gasLimit: gasLimit, value: amount });
            const mintRx = await createTx.wait();
            console.log(mintRx);

        } catch (error) {
            console.log(error);
        }

        console.log(raffleId);
    }

    async function drawWinner(raffleId) {
        const provider = walletData[1];
        const signer = provider.getSigner();
        const gasLimit = 600000;
        try {
            const AIcontract = new ethers.Contract(AIaddress, AIabi, signer);
            console.log('Generating')
            const createTx = await AIcontract.generateWinner(0, parseInt(participants), parseInt(raffleId), { gasLimit: gasLimit });
            const mintRx = await createTx.wait();
            console.log('Generated');


            console.log(mintRx);

        } catch (error) {
            console.log(error);
        }
    }

    async function winnerNFT(raffleId) {

        const provider = walletData[1];
        const signer = provider.getSigner();
        const gasLimit = 600000;

        try {
            const AIcontract = new ethers.Contract(AIaddress, AIabi, signer);
            console.log('Transfering NFT')

            const createTx = await AIcontract.winnerGetNFT(parseInt(raffleId), { gasLimit: gasLimit });
            const mintRx = await createTx.wait();
            console.log('NFT transfered');

            const NFTtoken = await AIcontract.getRaffleTokenId(parseInt(raffleId), { gasLimit: gasLimit });
            console.log(NFTtoken)
            const NFTcontract = new ethers.Contract(NFTaddress, NFTabi, signer);
            const owner = await NFTcontract.ownerOf(parseInt(NFTtoken.toString()));

            console.log('OWNER OF NFT ', owner)

            console.log(mintRx);

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        async function hello() {
            
            if (activePopupIndex != null) {
                const provider = walletData[1];
                const signer = provider.getSigner();

                const AIcontract = new ethers.Contract(AIaddress, AIabi, signer);
                const createTx = await AIcontract.particantCount(parseInt(activePopupIndex))

                const participantsArr = await AIcontract.getParticipants(parseInt(activePopupIndex));
                console.log(participantsArr);

                const winner = await AIcontract.winner(parseInt(activePopupIndex));

                if (participantsArr.includes(walletData[0])) {
                    setParticipation(true);
                }
                else {
                    setParticipation(false);
                }

                console.log(createTx)
                console.log(activePopupIndex)
                setParticipants(createTx.toString())
                setWinner(winner.toString())
            }
        
        }

        hello()
    }, [activePopupIndex])
    return (
        <div>
            <div class="container">
                <div class="button" id="toggleButton">+</div>
                <div class="text-fields" id="textFields">
                    <input type="text" placeholder="Token ID" className='create-textfield' onChange={((e) => { setTokenID(e.target.value) })} />
                    <input type="text" placeholder="Amount" className='create-textfield' onChange={((e) => { setAmount(e.target.value) })} />
                    <input type="text" placeholder="NFT Address" className='create-textfield' onChange={((e) => { setNFTaddressInput(e.target.value) })} />
                    <button id="submitButton" className='raffle-create' onClick={handleSubmit}>Submit</button>
                </div>
            </div>
            <div className="card-container">

                {raffleDetails.map((e, k) => (
                    <div className="card">
                        <img src={sampleImage} alt="Sample" className="card-image" />
                        <div className='token_id'>
                            Token Id: #{e.TokenId}
                        </div>
                        <div className='price-wrap'>
                            <img src={hederaImage} className='hedera-image' />
                            <h2 className="card-amount">{e.Amount} </h2>
                        </div>
                        <p className="card-owner">
                            Created by: {(e.Creator).slice(0, 5)}...{(e.Creator).slice(-4)}
                        </p>
                        {activePopupIndex === k && (
                            <div className="popup-overlay">
                                <div className="popup-content">
                                    <img src={sampleImage} className='popup-image' />
                                    <div className='popup-info'>
                                        <h2>Token Id: #{e.TokenId}</h2>
                                        <p>Created by: {(e.Creator)}</p>
                                        <p>Total Participants : {participants}</p>
                                        <p>Price to enter the raffle : {e.Amount} HBAR</p>
                                        <p>Winner : {winner}</p>
                                        {particpation && <button className='enter' id='enterRaff' onClick={() => enterRaffle(k, e.Amount)}>Enter Raffle</button>}
                                        <button className='enter' onClick={() => drawWinner(k)}> Draw Winner </button>
                                        <button className='enter' onClick={() => winnerNFT(k)}> Give NFT to Winner </button>
                                    </div>
                                    <button className="popup-close-button" onClick={handleClosePopup}>&times;</button>
                                </div>
                            </div>
                        )}
                        <button className="card-button" onClick={() => handleButtonClick(k)}>Enter Raffle</button>

                    </div>
                )
                )}
            </div>
        </div>
    )
}
