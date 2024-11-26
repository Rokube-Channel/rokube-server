const oauth2 =  require('google-auth-library');

const { OAuth2Client } = oauth2

const videoListFormat = (list) => {
    return list.reduce((acc, current) => {
        if (current.type.toLowerCase() == "video") {
            const duration = current.duration?.text ?? ""
            return [
                ...acc,
                {
                    id: current.id ?? '',
                    title: current.title?.text ?? '',
                    thumbnails: current.thumbnails[0]?.url ?? current.rich_thumbnail[0]?.url ?? '',
                    author_id: current.author?.id ?? '',
                    author_name: current.author?.name ?? '',
                    published: current.published?.text ?? '',
                    short_view_count: current.short_view_count?.text ?? current.view_count?.text ?? '',
                    duration: duration=="N/A"? "LIVE": duration
                }
            ]
        }
        return acc
    }, [])
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
            console.log(newCredentials)
        } 
        else { 
            throw error; 
        } 
    }
    return newCredentials
}

module.exports = { videoListFormat, verifyAndRefreshToken }