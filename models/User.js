const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // Agrega los nuevos campos aquí
    ethereumAddress: {
        type: String,
        required: true,
    },
    tokenBalance: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;

