module.exports = {
    webhook: "WebhookLink", // Discord webhook to ping once its back online
    timer: "30000", // 30 Seconds
    sites: [
        {
            error: "503 Service Unavailable", // Error message to search for
            website: "WebsiteLink", // Website to ping
            open: "LinkToOpen", // Link to open when the website is online
        }
    ]
};