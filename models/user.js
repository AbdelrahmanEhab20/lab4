const mongoose = require('mongoose');
const bycrb = require('bcryptjs');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: 7,
        required: true,
        unique: true,
    },
    firstname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 15,
    },
    lastname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 15,
    },
    password: {
        type: String,
        required: true,
    }
}, {
    toJSON: {
        transform: (doc, ret, options) => {
            delete ret.password;
            delete ret.__v;
            return ret;
        },
    }
});

userSchema.pre('save', function () {
    const hash = bycrb.hashSync(this.password, 8)
    this.password = hash;
});


const user = mongoose.model('User', userSchema);

module.exports = user;