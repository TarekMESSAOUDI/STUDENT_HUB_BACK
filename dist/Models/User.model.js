"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_1 = __importDefault(require("mongoose-paginate"));
let userSchema = new mongoose_1.default.Schema({
    nom: { type: String, required: true },
    prenom: { type: String },
    titre: { type: String },
    email: { type: String, required: true },
    tel: { type: String },
    cin: { type: String, required: true },
    addresse: { type: String },
    dateNaissance: { type: Date, required: true },
    mdp: { type: String, required: true, default: new Date() },
    confirmMdp: { type: String, required: true, default: new Date() },
    desactiver: { type: Boolean },
    resettoken: { type: String },
    disponibilite: { type: String },
    rang: { type: Number },
    image: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Image"
    },
    sex: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Sex"
    },
    role: {
        type: mongoose_1.default.Schema.Types.String,
        ref: "Role"
    },
});
userSchema.plugin(mongoose_paginate_1.default);
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
