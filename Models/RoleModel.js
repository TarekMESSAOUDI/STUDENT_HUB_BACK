/*const mongoose = require("mongoose");
const Role = mongoose.model(
  "Role",
  new mongoose.Schema({
    nom: String
  })
);
module.exports = Role*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleModel = new Schema({
  nom: { type: String, required: true },
});

module.exports = mongoose.model("Role", roleModel);
