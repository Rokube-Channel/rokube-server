const youtubedl = require('youtube-dl-exec')

const VideoDLRequest = async (req, res) => {
    const { myOauth: credentials, query } = req
    const { id = "" } = query

    const video = await youtubedl(`https://www.youtube.com/watch?v=${id}`, {
        dumpSingleJson: true,
        noCheckCertificates: true,
        noWarnings: true,
        preferFreeFormats: true,
        addHeader: ['referer:youtube.com', 'user-agent:googlebot']
      })

    return res.json({ video })
}

module.exports = VideoDLRequest