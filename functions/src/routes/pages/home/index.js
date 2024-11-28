const path = require('path');

const HomeRequest = async (req, res) => {
    return res.sendFile(path.join(__dirname, "/home.html"))
}

module.exports = HomeRequest