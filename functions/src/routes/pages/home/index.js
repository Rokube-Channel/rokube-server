const path = require('path');

const HomeRequest = async (req, res) => {
    return res.json({ view: path.join(__dirname, "/src/routes/api/home.html") })
    return res.sendFile(path.join(__dirname, "home.html"))
}

module.exports = HomeRequest