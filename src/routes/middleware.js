const oauth2 =  require('google-auth-library');

const { OAuth2Client } = oauth2
const node_cache = require( "node-cache" );

const myCache = new node_cache();

const MiddlewareCache = async (req, res, next) => {
    req.myCache = myCache;
    next();
}

const MiddlewareServer = async (req, res, next) => {
    const { headers } = req
    const { authorization = undefined, clientid = undefined, clientsecret = undefined } = headers;
    
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

const verifyAndRefreshToken = async (clientid, clientsecret,credentials) => {
    const oAuth2Client = new OAuth2Client(clientid, clientsecret);

    let newCredentials = undefined
    oAuth2Client.setCredentials(credentials);
    
    try { 
        await oAuth2Client.getTokenInfo(oAuth2Client.credentials.access_token); 
        newCredentials = oAuth2Client.credentials
    } catch (error) { 
        code = (error?.response?.data?.error ?? "") == "invalid_token"? 401 : 0
        if (code === 401) { 
            const tokens = await oAuth2Client.refreshAccessToken();
            newCredentials = tokens.credentials
        } 
        else { 
            throw error; 
        } 
    }
    return newCredentials
}

module.exports = { MiddlewareServer, MiddlewareCache }