const HomePage = require('./home');

const HomeRequest = async (req, res) => {
    return res.send(HomePage)
}

module.exports = HomeRequest