"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let todos = [];
const router = (0, express_1.Router)();
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res, next) => {
    const newTodo = {
        id: new Date().toISOString(),
        text: req.body.text
    };
    todos.push(newTodo);
    res.status(200).json({ todos: todos });
});
router.post('/todo/delete', (req, res, next) => {
    const reqId = req.body.id;
    let entry = todos.findIndex((item) => item.id === reqId);
    if (entry >= 0) {
        todos.splice(reqId, 1);
        res.status(200).json({ todos });
    }
    else
        res.status(404).json({ "Error": "Not Found" });
});
router.post('/todo/edit', (req, res, next) => {
    const reqId = req.body.id;
    const newItem = req.body.text;
    let entry = todos.findIndex((item) => item.id === reqId);
    if (entry >= 0) {
        todos[entry] = { id: reqId, text: newItem };
        res.status(200).json({ todos });
    }
    else
        res.status(404).json({ "Error": "Not Found" });
});
exports.default = router;
