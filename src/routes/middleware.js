const node_cache = require( "node-cache" );
const methods = require("../methods/index");

const { verifyAndRefreshToken } = methods
const myCache = new node_cache();

const MiddlewareRequest = async (req, res, next) => {
    const { headers } = req
    const { authorization = undefined, clientid = undefined, clientsecret = undefined } = headers;

    req.myCache = myCache;
    
    if(authorization && authorization.startsWith('Bearer ') && clientid && clientsecret){
        credentials = JSON.parse(authorization.slice(7));
        req.myOauth = await verifyAndRefreshToken(clientid, clientsecret, credentials)
            .then((newCredentials) => {
                const { access_token: oldAccessToken, refresh_token: oldRefreshToken } = credentials; 
                const { access_token: newAccessToken, refresh_token: newRefreshToken } = newCredentials;
            
                const tokensUpdated = oldAccessToken !== newAccessToken || oldRefreshToken !== newRefreshToken
                if(tokensUpdated){
                    const newOathCredentials = { access_token: newAccessToken, refresh_token: newRefreshToken, expiry_date: new Date(newCredentials.expiry_date).toISOString() }
                    res.setHeader('credentials', JSON.stringify(newOathCredentials));
                    return newOathCredentials
                }
                return credentials
            })
            .catch((err) => {
                console.error('Error token:', err); 
                res.setHeader('logout', true);
                return undefined
            })
    }
    next();
}

module.exports = MiddlewareRequest