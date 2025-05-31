const express = require('express');
const { createNote, getNotes } = require('./Controller');
const favoriteRouter = express.Router();


favoriteRouter.post('/:id/favorite', createNote)

favoriteRouter.get('/:id/favorite', getNotes)


module.exports = { favoriteRouter }