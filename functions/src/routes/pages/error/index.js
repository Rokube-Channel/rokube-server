const ErrorPage = require("./error")

const ErrorRequest = async (req, res) => {
    return res.send(ErrorPage)
}

module.exports = ErrorRequest