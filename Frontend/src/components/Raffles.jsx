import {Client, Hbar, TopicMessageSubmitTransaction, TopicCreateTransaction} from '@hashgraph/sdk';

import {client,url,topicId} from './helper'
import { useEffect, useState } from 'react';
import { Buffer } from 'buffer';


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
        }
        getHedera()
    }, [])

    return (
        <div>

        </div>
    )
}
