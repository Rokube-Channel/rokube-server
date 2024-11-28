const path = require('path');

const HomeRequest = async (req, res) => { 
    const filePath = path.resolve(__dirname, 'home.html'); 
    fs.readFile(filePath, 'utf8', (err, data) => { 
        if (err) { 
            res.status(500).send('Error al leer el archivo'); return; 
        } 
        res.send(data); 
    }); 
}

module.exports = HomeRequest;
