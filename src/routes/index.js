const express = require('express');

const HomeRequest = require("./home")
const HistoryRequest = require("./history")
const SearchRequest = require("./search")
const VideoRequest = require("./video")
const { RendezvousLinkingRequest, OauthRequest, LoginRequest } = require("./rendezvous-linking")
const LogoutRequest = require("./logout")
const AccountRequest = require("./account")
// const { init, login, home, logout, oauth } = require("./loginCache")
const MiddlewareRequest = require("./middleware")

const router = express.Router();

router.use(MiddlewareRequest);

router.get('/home', HomeRequest)
router.get('/history', HistoryRequest)
router.get('/search', SearchRequest)
router.get('/video', VideoRequest)
router.get('/rendezvous-linking', RendezvousLinkingRequest);
router.get('/login', LoginRequest);
router.get('/oauth/:code', OauthRequest);
router.get('/logout', LogoutRequest)
router.get('/account', AccountRequest)
// router.get("/test_login", login)
// router.get("/test_oauth/:code", oauth)
// router.get("/test_home", home)
// router.get("/test_logout", logout)
// router.get("/test", init)

module.exports = router;