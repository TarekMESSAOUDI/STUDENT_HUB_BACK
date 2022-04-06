const mongoose = require("mongoose");
const Role = mongoose.model(
  "Role",
  new mongoose.Schema({
    nom: String
  })
);
module.exports = Role
