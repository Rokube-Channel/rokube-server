const serverless = require("serverless-http")

const server = require("./src/app");

module.exports.handler = async () => { 
    const app = await server(); 
    return serverless(app); 
};