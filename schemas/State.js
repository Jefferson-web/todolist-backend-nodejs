const { Schema, model } = require('mongoose');

const stateSchema = new Schema({
    description: { type: String }
});

module.exports = model("State", stateSchema);