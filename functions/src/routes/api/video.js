const youtubei = require('youtubei.js');

const { Innertube } = youtubei

const VideoRequest = async (req, res) => {
    const { myOauth: credentials, query } = req
    const { id = "" } = query

    let expired = false

    try {
        const innertube = await Innertube.create();

        const videoData = await innertube.actions.execute('/player', {
            videoId: id,
            client: 'iOS',
            parse: true,
        });

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

        if (!expired) {
            return res.json({
                id: videoData.video_details.id ?? 'ID no disponible',
                title: videoData.video_details.title ?? 'Título no disponible',
                duration: videoData.video_details.duration ?? 'Duración no disponible',
                thumbnails: videoData.video_details.thumbnail?.pop()?.url ?? 'URL no disponible',
                author_id: videoData.video_details.channel_id ?? 'ID de autor no disponible',
                author_name: videoData.video_details.author ?? 'Nombre de autor no disponible',
                short_view_count: videoData.video_details.view_count ?? 'Conteo de vistas no disponible',
                video_url: videoData.streaming_data.formats[0] ?? videoData.streaming_data.hls_manifest_url ?? 'Video no disponible',
                video_quality: videoData.streaming_data.quality_label ?? "Calidad no disponible"
            })
        }
    }
    catch (err) {
        console.error('Error Video:', err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = VideoRequest