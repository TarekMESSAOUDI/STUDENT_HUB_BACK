const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventModel = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, default: new Date().toISOString() },
  start: { type: String, default: new Date().toISOString() },
  end: { type: String, default: new Date().toISOString() },
  image: { type: String, default: "Event.png", required: false },
  like: {type: Number, default: 0},
  masquer: {type: Boolean, default: true},
  nombreCommentaire: {type: Number, default:0},
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  commentaires: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Commentaire",
    }
  ]
});

module.exports = mongoose.model("Event",EventModel);
