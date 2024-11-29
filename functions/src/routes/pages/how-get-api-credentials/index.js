const HowGetAPICredentialsPage = require("./how-get-api-credentials")

const HowGetApiCredentialsRequest = async (req, res) => {
    return res.send(HowGetAPICredentialsPage)
}

module.exports = HowGetApiCredentialsRequest