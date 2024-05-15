"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todo_validators_1 = require("./todo.validators");
const todo_entity_1 = require("./entities/todo.entity");
const datasource_1 = require("../datasource");
const router = (0, express_1.Router)();
router.get("", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todoRepository = datasource_1.dataSource.getRepository(todo_entity_1.Todo);
    const totalTodos = yield todoRepository.count();
    const todos = yield todoRepository.find({});
    res.json({
        message: "todos fetched",
        data: todos,
        total: totalTodos,
    });
}));
router.get("/:todoId", (req, res) => {
    res.json({ message: "todo id " + req.params.todoId + " is called " });
});
router.post("", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = todo_validators_1.todoSchema.validate(req.body);
    const todoRepository = datasource_1.dataSource.getRepository(todo_entity_1.Todo);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const todo = todoRepository.create(value);
    const savedTodo = yield todoRepository.save(todo);
    res.json({ message: "todo created", data: savedTodo });
}));
router.put("/:todoId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.todoId) {
        return res.status(400).json({ message: "todoId is required" });
    }
    // check if todoId is numeric or not
    if (isNaN(parseInt(req.params.todoId))) {
        return res.status(400).json({ message: "todoId should be a number" });
    }
    const todoRepository = datasource_1.dataSource.getRepository(todo_entity_1.Todo);
    const todoId = parseInt(req.params.todoId);
    const todoExists = yield todoRepository.findOne({
        where: { id: todoId },
    });
    if (!todoExists) {
        return res.status(400).json({ message: "todo not found" });
    }
    const { error, value } = todo_validators_1.todoSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const todo = todoRepository.create(value);
    const savedTodo = todoRepository.save(todo);
    res.json({ message: "todo updated", data: savedTodo, updated: true });
}));
router.delete("/:todoId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.todoId) {
        return res.status(400).json({ message: "todoId is required" });
    }
    // check if todoId is numeric or not
    if (isNaN(parseInt(req.params.todoId))) {
        return res.status(400).json({ message: "todoId should be a number" });
    }
    const todoRepository = datasource_1.dataSource.getRepository(todo_entity_1.Todo);
    const todoId = parseInt(req.params.todoId);
    const todoExists = yield todoRepository.findOne({
        where: { id: todoId },
    });
    if (!todoExists) {
        return res.status(400).json({ message: "todo not found" });
    }
    yield todoRepository.delete({
        id: todoId,
    });
    res.json({
        message: "todo deleted",
        deleted: true,
    });
}));
exports.default = router;
//# sourceMappingURL=todo.router.js.map