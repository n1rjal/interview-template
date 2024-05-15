import { Router } from "express";
import { todoSchema } from "./todo.validators";
import { Todo } from "./entities/todo.entity";
import { dataSource } from "../datasource";

const router = Router();

router.get("", async (req, res) => {
  const todoRepository = dataSource.getRepository(Todo);
  const totalTodos = await todoRepository.count();
  const todos = await todoRepository.find({});

  res.json({
    message: "todos fetched",
    data: todos,
    total: totalTodos,
  });
});

router.get("/:todoId", (req, res) => {
  res.json({ message: "todo id " + req.params.todoId + " is called " });
});

router.post("", async (req, res) => {
  const { error, value } = todoSchema.validate(req.body);
  const todoRepository = dataSource.getRepository(Todo);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const todo = todoRepository.create(value);
  const savedTodo = await todoRepository.save(todo);
  res.json({ message: "todo created", data: savedTodo });
});

router.put("/:todoId", async (req, res) => {
  if (!req.params.todoId) {
    return res.status(400).json({ message: "todoId is required" });
  }
  // check if todoId is numeric or not
  if (isNaN(parseInt(req.params.todoId))) {
    return res.status(400).json({ message: "todoId should be a number" });
  }
  const todoRepository = dataSource.getRepository(Todo);
  const todoId = parseInt(req.params.todoId);
  const todoExists = await todoRepository.findOne({
    where: { id: todoId },
  });
  if (!todoExists) {
    return res.status(400).json({ message: "todo not found" });
  }
  const { error, value } = todoSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const todo = todoRepository.create(value);
  const savedTodo = todoRepository.save(todo);
  res.json({ message: "todo updated", data: savedTodo, updated: true });
});

router.delete("/:todoId", async (req, res) => {
  if (!req.params.todoId) {
    return res.status(400).json({ message: "todoId is required" });
  }
  // check if todoId is numeric or not
  if (isNaN(parseInt(req.params.todoId))) {
    return res.status(400).json({ message: "todoId should be a number" });
  }
  const todoRepository = dataSource.getRepository(Todo);
  const todoId = parseInt(req.params.todoId);
  const todoExists = await todoRepository.findOne({
    where: { id: todoId },
  });
  if (!todoExists) {
    return res.status(400).json({ message: "todo not found" });
  }
  await todoRepository.delete({
    id: todoId,
  });

  res.json({
    message: "todo deleted",
    deleted: true,
  });
});

export default router;
