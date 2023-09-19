const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            default: 'client',
        },
        created_at: { type: Date },
        updated_at: { type: Date },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);

module.exports = User = model('user', UserSchema);
