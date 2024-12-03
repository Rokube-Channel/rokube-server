const youtubei = require('youtubei.js');

const { Innertube } = youtubei

const VideoRequest = async (req, res) => {
    const { myOauth: credentials, query } = req
    const { id = "" } = query
    
    let expired = false
    
    try{
        const innertube = await Innertube.create();
    
        const video = await innertube.getStreamingData(id, { format: "mp4", type: "video+audio", quality: "bestefficiency" }).catch(err => { })
        const info = await innertube.getInfo(id).catch(err => console.error(err))
    
        const { basic_info = {}, primary_info = {}, streaming_data = {} } = info
    
        const videoData = { ...primary_info, ...basic_info, ...(video || streaming_data) }

        console.log("My video ", video)
        console.log("My info ", info)
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
                await info.addToWatchHistory()
            }
            catch(err) { 
                console.error('No se pudo agregar al historial de reproducción:', err.message);
            }
        }
    
        if(!expired){
            return res.json({
                id: videoData.id ?? 'ID no disponible',
                title: videoData.title?.text ?? videoData.title ?? 'Título no disponible',
                duration: videoData.duration ?? 'Duración no disponible',
                thumbnails: videoData.thumbnail?.pop()?.url ?? 'URL no disponible',
                author_id: videoData.channel_id ?? 'ID de autor no disponible',
                author_name: videoData.author ?? 'Nombre de autor no disponible',
                published: videoData.relative_date?.text ?? videoData.published?.text ?? 'Fecha de publicación no disponible',
                short_view_count: videoData.short_view_count?.text ?? videoData.view_count?.text ?? 'Conteo de vistas no disponible',
                video_url: videoData.url ?? videoData.hls_manifest_url ?? 'Video no disponible',
                video_quality: videoData.quality_label ?? "Calidad no disponible"
            })
        }
    }
    catch (err) { 
        console.error('Error Video:', err); 
        return res.status(500).json({ error: "Internal Server Error" }); 
    }
}

module.exports = VideoRequest