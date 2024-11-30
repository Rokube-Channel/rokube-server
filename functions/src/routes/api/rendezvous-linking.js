const QRCode = require('qrcode');
const ShortUniqueId = require('short-unique-id');

const redirectUri = `https://rokube.netlify.app/auth`

const RendezvousLinkingRequest = async (req, res) => {
    const { myCache, headers, hostname, protocol } = req
    const { clientid = undefined, clientsecret = undefined } = headers
    const x_device = req.headers["x-device"] ?? "";

    try{
        const myXDevice = myCache.get(x_device)
        if(!myXDevice){
            const uid = new ShortUniqueId({ length: 8 });
            const deviceCode = uid.rnd();
            const verification_url = redirectUri
            const base64 = (await QRCode.toDataURL(`${redirectUri}/${deviceCode}`)).split(',')[1];

            myCache.set(deviceCode, { client: { clientid, clientsecret } } , 600 )
            res.setHeader('x-device', deviceCode)
            return res.json({ user_code: deviceCode, verification_url, base64 });
        }
        else{
            if(myXDevice.access_token){
                res.setHeader('credentials', JSON.stringify(myXDevice));
                myCache.del(x_device)
                console.log(myXDevice)
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

module.exports = { RendezvousLinkingRequest }