const server = require("./src/app");

(async () => { 
    const app = await server(); 
    app.listen(3000, () => console.log("Servidor listo ...")); 
})();