const express = require("express")
const bodyParser = require('body-parser');
const routes = require('./routes');

const init = async () => {
    const app = express()
    
    app.use("/public", express.static('public'))
    app.use(bodyParser.json());
    app.use(routes)
    return app;
}

module.exports = init


