const express = require("express")
const bodyParser = require('body-parser');
const routes = require('./routes');

const init = async () => {
    const app = express()
    
    app.use(express.static('public'))
    app.use(bodyParser.json());
    app.use(routes);
    return app;
    // app.listen(3000, () => console.log("Servidor listo ..."))
}

module.exports = init


