const fs = require('fs');
const path = require('path');

const HomeRequest = async (req, res) => { 
    const filePath = path.join(__dirname, 'home.html');
    console.log(filePath)
    fs.readFile(filePath, 'utf8', (err, data) => { 
        if (err) { 
            res.status(500).send('Error al leer el archivo'); return; 
        } 
        res.send(data); 
    }); 
}

module.exports = HomeRequest;
