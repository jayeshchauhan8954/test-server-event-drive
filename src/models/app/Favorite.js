const mongoose = require('mongoose');
const { _collectionName, _status, } = require('@src/utils/constants');
const { _commonKeys } = require('@src/utils/helpers/collection');

const favoriteSchema = new mongoose.Schema({
    document_id: { type: String, required: true },
    customer_id: { type: String, required: true },
    isFavorite: {
        type: Boolean,
        default: false
    },
    status: { type: String, enum: Object.values(_status), default: _status.Active },
    ..._commonKeys
}, { timestamps: true });

const Favorite = mongoose.model(_collectionName.Favorite, favoriteSchema)

module.exports = { Favorite }