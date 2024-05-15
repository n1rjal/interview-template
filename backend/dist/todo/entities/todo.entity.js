"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = void 0;
const typeorm_1 = require("typeorm");
let Todo = class Todo {
};
exports.Todo = Todo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)()
], Todo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "varchar",
        length: 100,
    })
], Todo.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "text",
    })
], Todo.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamptz",
    })
], Todo.prototype, "attend_at", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "boolean",
        default: false,
    })
], Todo.prototype, "is_completed", void 0);
exports.Todo = Todo = __decorate([
    (0, typeorm_1.Entity)("todo")
], Todo);
//# sourceMappingURL=todo.entity.js.map