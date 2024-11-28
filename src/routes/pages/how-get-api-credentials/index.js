const path = require('path');

const HowGetApiCredentialsRequest = async (req, res) => {
    return res.sendFile(path.join(__dirname, "how-get-api-credentials.html"))
}

module.exports = HowGetApiCredentialsRequest