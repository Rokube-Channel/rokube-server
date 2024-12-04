const youtubei = require('youtubei.js');
const methods = require("../../utils")

const { Innertube } = youtubei
const { videoListFormat } = methods

const HomeRequest = async (req, res) => {
    const { myOauth: credentials, query } = req
    let { page = 0 } = query

    let expired = false

    page = !isNaN(page)? parseInt(page):0

    try {
        const innertube = await Innertube.create();

        if (credentials) {
            const timeout = setTimeout(() => { 
                expired = true
                res.status(408).json({ error: "Request Timeout" });  
            }, 10000);

            await innertube.session.signIn(credentials)
            .catch(err => { 
                console.error('Error al iniciar sesión:', err); 
                res.setHeader('logout', true);
                return; 
            });

            clearTimeout(timeout)
        }

        let feed = await innertube.getHomeFeed()
        .catch(err => {
            console.error(err)
            return []
        })
    
        for(let i=1; i<=page; i++){
            feed = await feed.getContinuation().catch(err=> feed);
        }
        const videos = feed.videos
    
        if(!expired){
            return res.json({ home: videoListFormat(videos) });
        }
    }
    catch (err) { 
        console.error('Error:', err); 
        return res.status(500).json({ error: "Internal Server Error" }); 
    }
}

module.exports = HomeRequest