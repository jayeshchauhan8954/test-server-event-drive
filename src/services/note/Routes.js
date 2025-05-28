const express = require('express');
const { createNote, getNotes } = require('./Controller');
const noteRouter = express.Router();


noteRouter.post('/:id/notes', createNote)

noteRouter.get('/:id/notes', getNotes)


module.exports = { noteRouter }