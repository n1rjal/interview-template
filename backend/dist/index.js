"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const datasource_1 = require("./datasource");
const todo_router_1 = __importDefault(require("./todo/todo.router"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const port = process.env.PORT || 3000;
datasource_1.dataSource
    .initialize()
    .then(() => {
    console.log("Database initialized");
})
    .catch((err) => {
    console.error(err);
});
app.use(express_1.default.json());
app.use("/todos", todo_router_1.default);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map