const path = require('path');

const HomeRequest = async (req, res) => {
    return res.sendFile(path.resolve(__dirname, "home.html"))
}

module.exports = HomeRequest