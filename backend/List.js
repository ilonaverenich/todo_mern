const { Schema, model } = require('mongoose');

const listSchema = new Schema({
  id: String,
  list: String,
  active: Boolean
});

const Todo = model('Todo', listSchema);

module.exports = Todo;