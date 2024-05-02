import { useEffect, useState } from 'react';
import { TodoProvider } from './contexts';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos([...todos, { id: Date.now(), ...todo }]);
  };

  const updateTodo = (todoId, updatedTodo) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return updatedTodo;
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  const deleteTodo = (todoId) => {
    const updatedTodos = todos.filter(({ id }) => id !== todoId);

    setTodos(updatedTodos);
  };

  const toggleTodo = (todoId) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  // this runs only once when the component mounts
  useEffect(() => {
    const localTodos = JSON.parse(localStorage.getItem('todos'));

    if (localTodos && localTodos.length > 0) {
      setTodos(localTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleTodo }}
    >
      <main className="h-full flex flex-col justify-center gap-4 bg-cover">
        <TodoForm />
        <section className="w-2/5 min-w-96 mx-auto">
          {todos.map((todo) => (
            <TodoItem todo={todo} key={todo.id} />
          ))}
        </section>
      </main>
    </TodoProvider>
  );
}

export default App;
