const mongoose = require('mongoose');
const { _collectionName, _status, } = require('@src/utils/constants');
const { _commonKeys } = require('@src/utils/helpers/collection');

const notesSchema = new mongoose.Schema({
    document_id: { type: String, required: true },
    customer_id: { type: String, unique: true, required: true },
    note: {
        type: String,
        required: true,
        maxlength: [500, 'Note can only be maximum of 500 characters']
    },
    dateNTime: { type: Date, default: Date.now },
    status: { type: Number, enum: Object.values(_status), default: _status.Active },
    ..._commonKeys
}, { timestamps: true });

const Note = mongoose.model(_collectionName.Note, notesSchema)

module.exports = { Note }