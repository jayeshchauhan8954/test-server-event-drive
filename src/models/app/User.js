const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { _collectionName, _profileStatus, } = require('@src/utils/constants');
const { _commonKeys } = require('@src/utils/helpers/collection');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, minlength: [8, 'Password must be at least of 8 characters'], select: false },
    status: { type: Number, enum: Object.values(_profileStatus), default: _profileStatus.Active },
    ..._commonKeys
}, { timestamps: true });

// Middlewares
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.salt = salt

    next();
});

const User = mongoose.model(_collectionName.User, userSchema)

module.exports = { User }