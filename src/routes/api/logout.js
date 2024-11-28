const youtubei = require('youtubei.js');

const { Innertube } = youtubei

const LogoutRequest = async (req, res) => {
    const { authorization = undefined } = req.headers;

    let userInfo = {}
    let expired = false
    let credentials = undefined

    if(authorization && authorization.startsWith('Bearer ')){
        credentials = JSON.parse(authorization.slice(7));
    }

    try{
        const innertube = await Innertube.create();
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
            await innertube.session.signOut();
        }

        if(!expired){
            console.log("logout")
            res.setHeader('logout', true);
            return res.json({ userInfo });
        }
    }
    catch (err) {
        console.error(er)
        return res.status(500).json({ error: "Internal Server Error" }); 
    }
}

module.exports = LogoutRequest