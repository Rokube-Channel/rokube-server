const youtubei = require('youtubei.js');

const { Innertube } = youtubei

const VideoRequest = async (req, res) => {
    const { myOauth: credentials, query } = req
    const { id = "" } = query

    let expired = false
    
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

            try{
                const info = await innertube.getInfo(id).catch(err => console.error(err))
                await info.addToWatchHistory()
            }
            catch(err) { 
                console.error('No se pudo agregar al historial de reproducción:', err.message);
            }
        }

        return res.json({ history: "complete" })
        
    }
    catch (err) {
        console.error('Error Video:', err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = VideoRequest