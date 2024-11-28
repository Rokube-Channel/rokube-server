const path = require('path');

const ErrorRequest = async (req, res) => {
    return res.sendFile(path.join(__dirname, "error.html"))
}

module.exports = ErrorRequest