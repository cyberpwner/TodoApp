import { useState } from 'react';
import { useTodo } from '../contexts';

function TodoForm() {
  const [todo, setTodo] = useState('');

  const { addTodo } = useTodo();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!todo) return;

    addTodo({ text: todo.trim(), isCompleted: false });
    setTodo('');
  };

  const handleChange = ({ target: { value } }) => {
    setTodo(value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-2/5 min-w-96 grid gap-0 h-fit mx-auto"
    >
      <label htmlFor="todo" className="font-bold text-lg">
        Enter a todo task:
      </label>

      <div className="grid grid-cols-[1fr,auto] gap-0 h-fit">
        <input
          className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/70 py-1.5"
          type="text"
          name="todo"
          id="todo"
          placeholder="Enter a Todo..."
          value={todo}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="rounded-r-lg px-3 py-1 bg-indigo-500 hover:bg-indigo-600 text-white"
        >
          Add
        </button>
      </div>
    </form>
  );
}

export default TodoForm;
