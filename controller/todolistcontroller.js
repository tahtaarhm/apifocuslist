const TodoModel = require('../models/Todolist');

// CREATE
const createTodo = async (req, res) => {
  const { activity_list } = req.body;

  if (!activity_list) {
    return res.status(400).json({
      status: 400,
      message: 'Activity list tidak boleh kosong!',
      data: null,
    });
  }

  try {
    const result = await TodoModel.createTodo(activity_list);
    res.status(201).json({
      status: 201,
      message: 'Todo berhasil dibuat.',
      data: {
        id: result.insertId,
        activity_list,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Gagal membuat todo',
      serverMessage: error.message,
    });
  }
};

// READ ALL
const getAllTodos = async (req, res) => {
  try {
    const todos = await TodoModel.getAllTodos();
    res.status(200).json({
      status: 200,
      message: 'Berhasil mengambil data',
      data: todos,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Gagal mengambil data',
      serverMessage: error.message,
    });
  }
};

// READ BY ID
const getTodoById = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await TodoModel.getTodoById(id);

    if (!todo) {
      return res.status(404).json({
        status: 404,
        message: 'Todo tidak ditemukan',
        data: null,
      });
    }

    res.status(200).json({
      status: 200,
      message: 'Berhasil mengambil todo',
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Gagal mengambil todo',
      serverMessage: error.message,
    });
  }
};

// UPDATE
const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { activity_list } = req.body;

  if (!activity_list) {
    return res.status(400).json({
      status: 400,
      message: 'Activity list tidak boleh kosong!',
      data: null,
    });
  }

  try {
    await TodoModel.updateTodo(id, activity_list);
    res.status(200).json({
      status: 200,
      message: 'Todo berhasil diperbarui',
      data: {
        id,
        activity_list,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Gagal memperbarui todo',
      serverMessage: error.message,
    });
  }
};

// DELETE
const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    await TodoModel.deleteTodo(id);
    res.status(200).json({
      status: 200,
      message: 'Todo berhasil dihapus',
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Gagal menghapus todo',
      serverMessage: error.message,
    });
  }
};

module.exports = {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
};
