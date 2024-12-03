const ErrorRequest = async (req, res) => {
    const { myCache } = req
    let error = "No encontrado"

    const myerror = myCache.get("myError")
    if(myerror){
        error = myerror
    }
    return res.json({ error })
}

module.exports = ErrorRequest