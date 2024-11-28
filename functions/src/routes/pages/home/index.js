const path = require('path');

const HomeRequest = async (req, res) => {
    console.log(__dirname)
    return res.sendFile(path.resolve(__dirname, 'home.html'));
}

module.exports = HomeRequest;
