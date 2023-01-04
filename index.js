const config = require("./config");
const https = require('https');
const open = require('open');
const Discord = require('discord-webhook-node');

const webhook = new Discord.Webhook(config.webhook);

function ping() {
    https.get(config.website, (response) => {
        // Set encoding to UTF-8
        response.setEncoding('utf8');

        // Accumulate data in a string
        let body = '';
        response.on('data', (data) => {
            body += data;
        });

        response.on('end', () => {
            if (body.includes('503 Service Unavailable')) {
                console.log("Page contains 503 Service Unavailable")
            } else {
                webhook.send('Page contains 503 error').then(() => {
                    console.log('Webhook sent');
                });
                open(config.open);
            }
            setTimeout(ping, config.timer); // schedule next request in 30 seconds
        });
    });
}

ping(); // start the process