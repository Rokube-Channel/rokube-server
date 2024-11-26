const youtubei = require('youtubei.js');
const methods = require("../methods/index")

const { Innertube } = youtubei
const { videoListFormat } = methods

const SearchRequest = async (req, res) => {
    const { myOauth: credentials, query } = req
    let { s = "", page = 0 } = query

    let expired = false

    page = !isNaN(page)? parseInt(page):0

    try{
        const innertube = await Innertube.create({ lang: "es", location: "MX" });
    
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
    
        const suggestions = await innertube.getSearchSuggestions(s).then(async (results) => {
            return await results.reduce((acc, current) => [...acc, { title: current }], [])
        }).catch(_ => [])
    
        let search = await innertube.search(s)
    
        for(let i=1; i<=page; i++){
            search = await search.getContinuation().catch(err=> search);
        }
        
        const videos = search.videos
    
        if(!expired){
            return res.json({ suggestions: page==0? suggestions:undefined, search: videoListFormat(videos) });
        }
    }
    catch (err) { 
        console.error('Error:', err); 
        return res.status(500).json({ error: "Internal Server Error" }); 
    }
}

module.exports = SearchRequest