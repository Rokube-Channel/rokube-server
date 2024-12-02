const oauth2 =  require('google-auth-library');

const AuthPage = require("./auth")
const LoginPage = require("./login")

const { OAuth2Client } = oauth2
const redirectUri = `https://rokube.netlify.app/login`

const AuthRequest = async (req, res) => {
    const { error } = req.query;
    return res.send(AuthPage)
}

const OauthRequest = async (req, res) => {
    const { myCache, params, hostname, protocol } = req
    const { code = "" } = params

    const device = myCache.get(code);
    if (!code || !device) {
        return res.redirect("/auth?error=No code provided.");
    }

    try{
        const oAuth2Client = new OAuth2Client(
            device.client.clientid,
            device.client.clientsecret,
            redirectUri
        );

        const authorizationUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: [
                "http://gdata.youtube.com",
                "https://www.googleapis.com/auth/youtube",
                "https://www.googleapis.com/auth/youtube.force-ssl",
                "https://www.googleapis.com/auth/youtube-paid-content",
                "https://www.googleapis.com/auth/accounts.reauth",
            ],
            prompt: 'consent',
            state: code
        });

        return res.redirect(authorizationUrl);
    }
    catch (err) { 
        console.error("Error ", err)
        return res.redirect(`/auth?error=Internal Server Error`);
    }
}

const LoginRequest = async (req, res) => {
    const { myCache, query } = req
    const { code, state = "" } = query;

    const device = myCache.get(state);

    if (!code || !device) {
        return res.redirect(`/auth?error=No device`);
    }

    try{
        const oAuth2Client = new OAuth2Client(
            device.client.clientid,
            device.client.clientsecret,
            redirectUri
        );

        const { tokens } = await oAuth2Client.getToken(code);
    
        if (tokens.access_token && tokens.refresh_token && tokens.expiry_date) {
            const credentials = {
                access_token: tokens.access_token,
                refresh_token: tokens.refresh_token,
                expiry_date: new Date(tokens.expiry_date).toISOString(),
            }
            myCache.set(state, credentials, 600 )
            return res.send(LoginPage);
        }
        else {
            return res.redirect(`/auth?error=No token`)
        }
    }
    catch(err){
        console.error('Error:', err); 
        return res.redirect(`/auth?error=Internal Server Error`)
    }
}

module.exports = { AuthRequest, LoginRequest, OauthRequest}