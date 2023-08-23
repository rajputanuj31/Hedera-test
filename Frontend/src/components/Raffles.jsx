import { Client, Hbar, TopicMessageSubmitTransaction, TopicCreateTransaction } from '@hashgraph/sdk';
import Cards from './Cards'
import { client, url, topicId } from './helper'
import { useEffect, useState } from 'react';
import { Buffer } from 'buffer';
import sampleImage from './sample.png'; // Replace with the actual path to your image
import hederaImage from './hedera.png';

export default function () {

    const [raffleDetails, setRaffleDetails] = useState([]);

    useEffect(() => {
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
        getHedera()
    }, [])

    return (
        <div>
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
                        <button className="card-button">Enter Raffle</button>
                    </div>
                )
                )}
            </div>


        </div>
    )
}
