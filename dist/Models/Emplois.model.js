"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_1 = __importDefault(require("mongoose-paginate"));
let emploisSchema = new mongoose_1.default.Schema({
    nom: { type: String, required: true },
    dasemaineta: { type: String, required: true },
    date: { type: Date, default: new Date() },
    tache: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Tache"
        }
    ],
});
emploisSchema.plugin(mongoose_paginate_1.default);
const Emplois = mongoose_1.default.model("Emplois", emploisSchema);
exports.default = Emplois;
