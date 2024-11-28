const HomeRequest = async (req, res) => {
    return res.sendFile("./home.html")
}

module.exports = HomeRequest