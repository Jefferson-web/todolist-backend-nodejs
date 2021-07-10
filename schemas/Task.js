const { Schema, Types, model } = require('mongoose');

const taskSchema = new Schema({
    description: { type: String },
    state: { type: Types.ObjectId, ref: "State" },
    createAt: { type: Date, default: Date.now() }
});

module.exports = model("Task", taskSchema);