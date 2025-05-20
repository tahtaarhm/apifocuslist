const dbPool = require('../config/database');

// CREATE
const createTodo = async (activity) => {
  const query = `
    INSERT INTO todolist (activity_list)
    VALUES (?)
  `;
  const [result] = await dbPool.execute(query, [activity]);
  return result;
};

// READ ALL
const getAllTodos = async () => {
  try {
    const query = 'SELECT * FROM todolist';
    const [rows] = await dbPool.execute(query);
    return rows;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw new Error('Internal Server Error');
  }
};


// READ BY ID
const getTodoById = async (id) => {
  const query = `SELECT * FROM todolist WHERE id = ?`;
  const [rows] = await dbPool.execute(query, [id]);
  return rows[0];
};

// UPDATE
const updateTodo = async (id, newActivity) => {
  const query = `
    UPDATE todolist
    SET activity_list = ?
    WHERE id = ?
  `;
  const [result] = await dbPool.execute(query, [newActivity, id]);
  return result;
};

// DELETE
const deleteTodo = async (id) => {
  const query = `DELETE FROM todolist WHERE id = ?`;
  const [result] = await dbPool.execute(query, [id]);
  return result;
};

module.exports = {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
};
