const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let NoteModel = new Schema({
    title: { type: String },
    start:{type: String, default: new Date().toISOString()},
    end:{type: String, default: new Date().toISOString()},
    description:{type: String,required: true},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});
module.exports = mongoose.model("Note", NoteModel);