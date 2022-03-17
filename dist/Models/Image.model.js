"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_1 = __importDefault(require("mongoose-paginate"));
let imageSchema = new mongoose_1.default.Schema({
    nom: { type: String, required: true },
    data: { type: ImageData }
});
imageSchema.plugin(mongoose_paginate_1.default);
const Image = mongoose_1.default.model("Image", imageSchema);
exports.default = Image;
