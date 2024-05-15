"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoSchema = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
exports.todoSchema = joi_1.default.object({
    title: joi_1.default.string().required().max(100).min(1),
    description: joi_1.default.string().required().max(10000).min(1),
    attend_at: joi_1.default.date().required(),
    is_completed: joi_1.default.boolean().required(),
});
//# sourceMappingURL=todo.validators.js.map