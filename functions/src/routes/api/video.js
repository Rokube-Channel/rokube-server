const youtubei = require('youtubei.js');
// const axios = require("axios")
// const cp = require('child_process');
// const ffmpeg = require('ffmpeg-static');

const { Innertube } = youtubei

const VideoRequest = async (req, res) => {
  // const { query } = req
  // const { id = "" } = query

  // const payload = {
  //   "playbackContext": {
  //     "contentPlaybackContext": {
  //       "vis": 0,
  //       "splay": false,
  //       "referer": `https://www.youtube.com/watch?v=${id}`,
  //       "currentUrl": `/watch?v=${id}`,
  //       "autonavState": "STATE_ON",
  //       "autoCaptionsDefaultOn": false,
  //       "html5Preference": "HTML5_PREF_WANTS",
  //       "lactMilliseconds": "-1"
  //     }
  //   },
  //   "attestationRequest": {
  //     "omitBotguardData": true
  //   },
  //   "racyCheckOk": true,
  //   "contentCheckOk": true,
  //   "videoId": `${id}`,
  //   "context": {
  //     "client": {
  //       "hl": "en",
  //       "gl": "US",
  //       "remoteHost": "",
  //       "screenDensityFloat": 1,
  //       "screenHeightPoints": 1440,
  //       "screenPixelDensity": 1,
  //       "screenWidthPoints": 2560,
  //       "visitorData": "",
  //       "clientName": "iOS",
  //       "clientVersion": "19.09.3",
  //       "osName": "iOS",
  //       "osVersion": "15.6",
  //       "platform": "MOBILE",
  //       "clientFormFactor": "UNKNOWN_FORM_FACTOR",
  //       "userInterfaceTheme": "USER_INTERFACE_THEME_LIGHT",
  //       "originalUrl": "https://www.youtube.com",
  //       "deviceMake": "Apple",
  //       "deviceModel": "iPhone10,6",
  //       "utcOffsetMinutes": -240,
  //       "memoryTotalKbytes": "8000000"
  //     },
  //     "user": {
  //       "enableSafetyMode": false,
  //       "lockedSafetyMode": false
  //     },
  //     "request": {
  //       "useSsl": true,
  //       "internalExperimentFlags": []
  //     }
  //   }
  // }

  // const { streamingData, videoDetails } = await axios.post("https://www.youtube.com/youtubei/v1/player?prettyPrint=false&alt=json", payload)
  //   .then(({ data }) => {
  //     const { streamingData, videoDetails } = data
  //     return { streamingData, videoDetails }
  //   })
  //   .catch((error) => {
  //     console.error(error)
  //     return null
  //   })

  // const videoUrl = streamingData.adaptiveFormats.find(format => format.mimeType.includes('video') && format.quality == "tiny").url;
  // const audioUrl = streamingData.adaptiveFormats.find(format => format.mimeType.includes('audio') && format.quality == "tiny").url;
  
  // return res.json({
  //   id: videoDetails.videoId ?? 'ID no disponible',
  //   title: videoDetails.title ?? 'Título no disponible',
  //   thumbnails: videoDetails.thumbnail?.thumbnails?.pop()?.url ?? 'URL no disponible',
  //   author_id: videoDetails.channelId ?? 'ID de autor no disponible',
  //   author_name: videoDetails.author ?? 'Nombre de autor no disponible',
  //   video_url: videoUrl ?? 'Video no disponible',
  //   audio_url: audioUrl ?? "Audio no disponible"
  // })

  const { myOauth: credentials, query } = req
  const { id = "" } = query

  let expired = false

  try{
      const innertube = await Innertube.create({ timezone: "GMT-06:00" });

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

      const videoData = await innertube.actions.execute('/player', {
        videoId: id,
        client: 'ANDROID',
        parse: true,
      });

      try{
          const info = await innertube.getInfo(id).catch(err => console.error(err))
          await info.addToWatchHistory()
      }
      catch(err) { 
          console.error('No se pudo agregar al historial de reproducción:', err.message);
      }

      if(!expired){
          return res.json({
              id: videoData.video_details.id ?? 'ID no disponible',
              title: videoData.video_details.title ?? 'Título no disponible',
              duration: videoData.video_details.duration ?? 'Duración no disponible',
              thumbnails: videoData.video_details.thumbnail?.pop()?.url ?? 'URL no disponible',
              author_id: videoData.video_details.channel_id ?? 'ID de autor no disponible',
              author_name: videoData.video_details.author ?? 'Nombre de autor no disponible',
              short_view_count: videoData.video_details.view_count ?? 'Conteo de vistas no disponible',
              video_url: videoData.streaming_data.hls_manifest_url ?? videoData.streaming_data.formats[0] ?? 'Video no disponible',
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