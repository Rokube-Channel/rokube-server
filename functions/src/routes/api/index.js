const express = require('express');

const HomeRequest = require("./home")
const HistoryRequest = require("./history")
const SearchRequest = require("./search")
const VideoRequest = require("./video")
const { RendezvousLinkingRequest } = require("./rendezvous-linking")
const LogoutRequest = require("./logout")
const AccountRequest = require("./account")
const VideoDLRequest = require("./youtube-dl")

const router = express.Router();

router.get('/home', HomeRequest)
router.get('/history', HistoryRequest)
router.get('/search', SearchRequest)
router.get('/video', VideoRequest)
router.get('/rendezvous-linking', RendezvousLinkingRequest);
router.get('/logout', LogoutRequest)
router.get('/account', AccountRequest)
router.get("/video-dl", VideoDLRequest)

module.exports = router;