const youtubedl = require('youtube-dl-exec')
const youtubei = require('youtubei.js');

const { Innertube } = youtubei

const VideoRequest = async (req, res) => {
    const { myOauth: credentials, query } = req
    const { id = "" } = query
    
    let expired = false
    
    try{
        const video = await youtubedl(`https://www.youtube.com/watch?v=${id}`, {
            dumpSingleJson: true,
            noCheckCertificates: true,
            noWarnings: true,
            preferFreeFormats: true,
            addHeader: ['referer:youtube.com', 'user-agent:googlebot']
        }).catch((err) => console.error(err))

        if (credentials) {

            const innertube = await Innertube.create();

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
                await innertube.getBasicInfo(id).addToWatchHistory()
            }
            catch(err) { 
                console.error('No se pudo agregar al historial de reproducción:', err.message);
            }
        }

        if(!expired){
            return res.json({
                id: video.id ?? 'ID no disponible',
                title: video.title ?? 'Título no disponible',
                thumbnails: video.thumbnail ?? 'URL no disponible',
                duration: video.duration ?? 0,
                duration_string: video.duration_string ?? 'Duración no disponible',
                is_live: video.is_live ?? false,
                author_id: video.channel_id ?? 'ID de autor no disponible',
                author_name: video.channel ?? 'Nombre de autor no disponible',
                video_url: video.url ?? 'Video no disponible',
                video_quality: video.height? `${video.height}p` : "Calidad no disponible",
                video_ext: video.video_ext ?? "Not Format",
                published: video.timestamp? new Date(video.timestamp * 1000).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }): "Fecha de publicación no disponible",
                short_view_count: video.view_count ?? 0
            })
        }
    }
    catch (err) { 
        console.error('Error Video:', err); 
        return res.status(500).json({ error: "Internal Server Error" }); 
    }
}

module.exports = VideoRequest