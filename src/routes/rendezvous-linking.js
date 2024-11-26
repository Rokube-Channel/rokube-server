const oauth2 =  require('google-auth-library');
const QRCode = require('qrcode');
const ShortUniqueId = require('short-unique-id');

const { OAuth2Client } = oauth2
const redirectUri = `http://localhost:3000/login`

const RendezvousLinkingRequest = async (req, res) => {
    const { myCache, headers, hostname, protocol } = req
    const { clientid = undefined, clientsecret = undefined } = headers
    const x_device = req.headers["x-device"] ?? "";

    try{
        const myXDevice = myCache.get(x_device)
        if(!myXDevice){
            const uid = new ShortUniqueId({ length: 8 });
            const deviceCode = uid.rnd();
            const verification_url = `${protocol}://${hostname}:3000/oauth/${deviceCode}`
            const base64 = (await QRCode.toDataURL(verification_url)).split(',')[1];

            myCache.set(deviceCode, { client: { clientid, clientsecret } } , 600 )
            res.setHeader('x-device', deviceCode)
            return res.json({ user_code: deviceCode, verification_url, base64 });
        }
        else{
            if(myXDevice.access_token){
                res.setHeader('credentials', JSON.stringify(myXDevice));
                myCache.del(x_device)
                return res.json({ auth: "complete" });
            }
            else{
                return res.json({ auth: "pending" });
            }
        }
    }
    catch (err) { 
        console.error('Error:', err);
        return res.status(500).json({ error: "Internal Server Error" }); 
    }
}

const OauthRequest = async (req, res) => {
    const { myCache, params, hostname, protocol } = req
    const { code = "" } = params

    const device = myCache.get(code);
    if (!code || !device) {
        return res.json({ message: 'No code provided.' });
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
            include_granted_scopes: true,
            prompt: 'consent',
            state: code
        });

        return res.redirect(authorizationUrl);
    }
    catch (err) { 
        console.error("Error ", err)
        return res.status(500).json({ error: "Internal Server Error" }); 
    }
}

const LoginRequest = async (req, res) => {
    const { myCache, query } = req
    const { code, state = "" } = query;

    const device = myCache.get(state);

    if (!code || !device) {
        return res.json({ message: 'No code provided.' });
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
            console.log("--------credentials--------")
            console.log(credentials)
            console.log("---------------------------")
            return res.json({ message: "Auth" });
        }
        else {
            return res.json({ message: "No Auth" })
        }
    }
    catch(err){
        console.error('Error:', err); 
        return res.status(500).json({ message: err.message ?? err })
    }
}

module.exports = { RendezvousLinkingRequest, LoginRequest, OauthRequest}