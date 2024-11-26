const youtubei = require('youtubei.js');
const oauth2 =  require('google-auth-library');
const ShortUniqueId = require('short-unique-id');
const QRCode = require('qrcode');

const { Innertube, UniversalCache } = youtubei;
const { OAuth2Client } = oauth2

const cache = new UniversalCache(false);

let innertube

const redirectUri = 'http://localhost:3000/test_login';

const init = async (req, res) => {
  const { myCache, headers } = req
  const { clientid = undefined, clientsecret = undefined } = headers

  if (!innertube) {
    innertube = await Innertube.create({ cache });

    innertube.session.on("update-credentials", async (_credentials) => {
      console.log(_credentials)
      await innertube?.session.oauth.cacheCredentials();
    });
  }

  if (await cache.get('youtubei_oauth_credentials')){
    await innertube.session.signIn();
  }

  if (innertube.session.logged_in) {
    const userInfo = await innertube.account.getInfo();
    return res.send({ userInfo  });
  }

  if (clientid && clientsecret ) {
    const uid = new ShortUniqueId({ length: 8 }); 
    const deviceCode = uid.rnd();
    const verification_url = `http://localhost:3000/test_oauth/${deviceCode}`
    const base64 = (await QRCode.toDataURL(verification_url)).split(',')[1];

    try{
      const oAuth2Client = new OAuth2Client(
        clientid,
        clientsecret,
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
        state: deviceCode
      });

      myCache.set(deviceCode, { client: { clientid, clientsecret, authorizationUrl } } , 600 )

      return res.json({ "x-device": deviceCode, user_code: deviceCode, verification_url, base64 });
    }
    catch(err){
      return res.status(500).json({ message: err.message ?? err })
    }
  } else {
    return res.json({ message: "No Auth" });
  }
}

const oauth = async (req, res) => {
  const { myCache, params } = req
  const { code = "" } = params

  const { client } = myCache.get(code);
  if (!code || !client) {
    return res.json({ message: 'No code provided.' });
  }

  return res.redirect(client.authorizationUrl);

}

const login = async (req, res) => {
  const { myCache, query } = req
  const { code, state = "" } = query;
  
  const { client = undefined } = myCache.get(state);

  if (!code || !client) {
    return res.json({ message: 'No code provided.' });
  }

  try{
    const oAuth2Client = new OAuth2Client(
      client.clientid,
      client.clientsecret,
      redirectUri
    );
    const { tokens } = await oAuth2Client.getToken(code);

    if (tokens.access_token && tokens.refresh_token && tokens.expiry_date) {
      const credentials = {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        expiry_date: new Date(tokens.expiry_date).toISOString(),
        client: {
          client_id: client.clientid,
          client_secret: client.clientsecret
        }
      }

      myCache.set(state, credentials, 600 )
      await innertube.session.signIn(credentials);

      await innertube.session.oauth.cacheCredentials();

      return res.json({ message: "Auth" });
    }
  }
  catch(err){
    return res.status(500).json({ message: err.message ?? err })
  }
}

const home = async (req, res) => {
  if (!innertube) {
    innertube = await Innertube.create({ cache });
  }

  if (await cache.get('youtubei_oauth_credentials')){
    await innertube.session.signIn();

    console.log(await innertube.account.getInfo().then(({ contents }) => {
      const { contents: data } = contents
      return { 
          account_name: data[0].account_name?.text ?? "",
          account_photo: data[0].account_photo?.pop().url ?? "",
          account_byline: data[0].account_byline?.text ?? ""
      }
    })
    .catch((err) => {
      console.error(err)
      return {}
    }))
  }

  const feed = await innertube.getHomeFeed()

  return res.json({ feed });
}

const logout = async (req, res) => {
  if(!innertube){
    innertube = await Innertube.create({ cache, generate_session_locally: false, visitor_data: "CgtaX2tjRDF5cjNiSSjJqNS5BjIKCgJNWBIEGgAgWA%3D%3D" });
  }

  if (await cache.get('youtubei_oauth_credentials')){
    await innertube.session.signIn();

    if (innertube.session.logged_in) {
      await innertube.session.signOut();
      await innertube.session.oauth.removeCache();
    }
  }
  return res.json({ message: "No Auth" })
}

module.exports = { init, login, home, logout, oauth }