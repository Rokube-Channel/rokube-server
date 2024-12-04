const youtubei = require('youtubei.js');

const { Innertube, } = youtubei

const AccountRequest = async (req, res) => {
    const { myOauth: credentials } = req

    let userInfo = {}
    let expired = false

    try {
        const innertube = await Innertube.create({ client_type: "TVHTML5_SIMPLY_EMBEDDED_PLAYER" });

        if (credentials) {
            const timeout = setTimeout(() => { 
                expired = true
                res.status(408).json({ error: "Request Timeout" });  
            }, 10000);

            await innertube.session.signIn(credentials)
            .catch(err => { 
                console.error('Error al iniciar sesión:', err); 
                return; 
            });

            clearTimeout(timeout)
        }

        if (innertube.session.logged_in) {
            userInfo = await innertube.account.getInfo()
            .then(({ contents }) => {
                const { contents: data } = contents
                const { account_byline = undefined, account_name = undefined, account_photo = undefined } = data[0]
                return {
                    account_byline: account_byline?.text ?? undefined,
                    account_name: account_name?.text ?? undefined,
                    account_photo: account_photo?.pop()?.url ?? undefined
                }
            })
            .catch((err) => {
                console.error(err)
                return {}
            });
        }

        if(!expired){
            return res.json({ userInfo });
        }
    }
    catch (err) { 
        console.error('Error:', err); 
        return res.status(500).json({ error: "Internal Server Error" }); 
    }
}

module.exports = AccountRequest