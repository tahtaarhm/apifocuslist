const express = require('express');
const router = express.Router();
const TodoController = require('../controller/todolistcontroller');

router.post('/', TodoController.createTodo);
router.get('/', TodoController.getAllTodos);    
router.get('/:id', TodoController.getTodoById);
router.put('/:id', TodoController.updateTodo);
router.delete('/:id', TodoController.deleteTodo);

module.exports = router;
