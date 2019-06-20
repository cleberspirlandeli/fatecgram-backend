const express = require('express');

const LikeController = require('../controller/LikeController');

const { Authorize } = require('./../config/token');

const routes = express.Router();

// Like Post Feed
routes.post('/posts/:id/like', Authorize, LikeController.store);

module.exports = routes;
