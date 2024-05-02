import { createContext } from "react";

const TodoContext = createContext({
  todos: [{ id: 1, text: "Learn React", isCompleted: true }],
  addTodo: (todo) => {},
  updateTodo: (todoId, updatedTodo) => {},
  deleteTodo: (todoId) => {},
  toggleTodo: (todoId) => {},
});

export default TodoContext;
