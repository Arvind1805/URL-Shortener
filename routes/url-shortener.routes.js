const fs = require('fs/promises')
const { urlShortenerController } = require('../controllers/url-shortener.controller.js');
const { postURLshortener } = require('../models/postURLshortener.models.js')
const {redirectURL} = require('../controllers/url-shortener.controller.js')

const {Router} = require('express')

const router = Router();

const loadlinks = async() =>{
  const data = await fs.readFile("links.json","utf-8");
  return JSON.parse(data);
}

router.get("/",urlShortenerController(loadlinks))

router.get("/:shortcode",redirectURL(loadlinks))

router.post("/",postURLshortener(loadlinks))

module.exports = {
  shortenerRoute : router,
}