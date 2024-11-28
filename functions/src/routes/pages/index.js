const express = require('express');

const HomeRequest = require("./home")
const HowGetApiCredentialsRequest = require("./how-get-api-credentials")
const { AuthRequest, OauthRequest, LoginRequest } = require("./auth")
const ErrorRequest = require("./error")

const router = express.Router();

router.get('/', HomeRequest)
router.get('/how-get-api-credentials', HowGetApiCredentialsRequest)
router.get('/login', LoginRequest);
router.get('/auth', AuthRequest);
router.get('/auth/:code', OauthRequest);
router.get('/*', ErrorRequest);

module.exports = router;