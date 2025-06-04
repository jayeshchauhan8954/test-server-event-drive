const express = require('express');
const { createNote, getNotes, editNote } = require('./Controller');
const noteRouter = express.Router();


noteRouter.post('/:id/notes', createNote)

noteRouter.get('/:id/notes', getNotes)

noteRouter.put('/:id/notes/:note_id', editNote);

noteRouter.delete('/:id/notes/:note_id', softDeleteNote);


module.exports = { noteRouter }