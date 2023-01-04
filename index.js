const config = require("./config");
const https = require('https');
const open = require('open');
const Discord = require('discord-webhook-node');

const webhook = new Discord.Webhook(config.webhook);

function ping() {
    config.sites.forEach(function(config) {
    https.get(config.website, (response) => {
        // Set encoding to UTF-8
        response.setEncoding('utf8');

        // Accumulate data in a string
        let body = '';
        response.on('data', (data) => {
            body += data;
        });

        response.on('end', () => {
            if (body.includes(config.error)) {
                console.log("Page contains " + config.error)
            } else {
                webhook.send('Page no longer contains ' + config.error).then(() => {
                    console.log('Webhook sent');
                });
                open(config.open);
            }
        });
    });
    });
    setTimeout(ping, config.timer); // schedule next request in 30 seconds
}

ping(); // start the process