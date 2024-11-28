const express = require('express');

const APIRouter = require("./api")
const PageRouter = require("./pages")
const { MiddlewareServer, MiddlewareCache } = require("./middleware")

const router = express.Router();

router.use(MiddlewareCache)
router.use("/api", MiddlewareServer);
router.use("/api", APIRouter)
router.use("/", PageRouter)

module.exports = router;