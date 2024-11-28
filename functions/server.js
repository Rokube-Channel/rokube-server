const serverless = require("serverless-http")

const server = require("./src/app");

module.exports.handler = async (event, context) => { 
    const app = await server(); 
    const handler = serverless(app); 
    return handler(event, context); 
};