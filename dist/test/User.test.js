"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_model_1 = __importDefault(require("../Models/User.model"));
describe("User", () => {
    it('should return User', function () {
        let user = new User_model_1.default();
        expect(User_model_1.default.find());
    });
});
