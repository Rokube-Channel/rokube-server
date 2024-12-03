const ErrorRequest = async (req, res) => {
    const { myCache } = req
    let error = "No encontrado"
    let video = ""

    const myerror = myCache.get("myError")
    const myvideo = myCache.get("myVideo")

    if(myerror){
        error = JSON.parse(myerror)
    }
    if(myvideo){
        video = JSON.parse(myvideo)
    }
    return res.json({ error, video })
}

module.exports = ErrorRequest