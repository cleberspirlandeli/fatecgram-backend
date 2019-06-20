const express = require('express');
const multer = require('multer');
const uploadConfig = require('../config/upload');

const PostController = require('../controller/PostController');

const routes = express.Router();
const upload = multer(uploadConfig);

// Feed
routes.get('/posts', PostController.index);
routes.post('/posts', upload.single('image'), PostController.store);

module.exports = routes;
