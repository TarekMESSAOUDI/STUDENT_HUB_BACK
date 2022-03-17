"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_1 = __importDefault(require("mongoose-paginate"));
let blogSchema = new mongoose_1.default.Schema({
    titre: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: new Date() },
    image: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Image"
    },
    commentaire: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Commentaire"
        }
    ],
});
blogSchema.plugin(mongoose_paginate_1.default);
const Blog = mongoose_1.default.model("Blog", blogSchema);
exports.default = Blog;
