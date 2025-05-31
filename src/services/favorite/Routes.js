const express = require('express');
const { createFavorite, getFavorites, getCustomerActiveFavorites } = require('./Controller');
const favoriteRouter = express.Router();


favoriteRouter.post('/:id/favorite', createFavorite)

favoriteRouter.get('/:id/favorite', getFavorites)

favoriteRouter.get('/favorite', getCustomerActiveFavorites)


module.exports = { favoriteRouter }