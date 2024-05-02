import { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useTodo } from '../contexts';

function TodoItem({ todo }) {
  const { id, text, isCompleted } = todo;

  const [isEditable, setIsEditable] = useState(false);
  const [todoText, setTodoText] = useState(text);

  const { updateTodo, deleteTodo, toggleTodo } = useTodo();

  const editTodo = () => {
    setTodoText(todoText.trim());
    updateTodo(id, { ...todo, text: todoText });
    setIsEditable(false);
  };

  const handleEditClick = () => {
    if (isCompleted) return;

    if (isEditable) {
      editTodo();
    } else {
      setIsEditable((prevValue) => !prevValue);
    }
  };

  const handleDeleteClick = () => {
    deleteTodo(id);
  };

  const toggle = (todoId) => {
    return () => toggleTodo(todoId);
  };

  return (
    <section
      className={classNames({
        'flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black mx-auto mb-1': true,
        'bg-[#ccbed7]': !isCompleted,
        'bg-[#c6e9a7]': isCompleted,
      })}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={isCompleted}
        onChange={toggle(id)}
      />

      <input
        type="text"
        name="todoText"
        id="todoText"
        className={classNames({
          'border outline-none w-full bg-transparent rounded-lg border-black/10 px-2': true,
          'border-transparent': !isEditable,
        })}
        value={todoText}
        onChange={({ target: { value } }) => setTodoText(value)}
        readOnly={!isEditable}
      />

      <button
        type="button"
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={handleEditClick}
        disabled={isCompleted}
      >
        {isEditable ? '📁' : '✏️'}
      </button>

      <button
        type="button"
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={handleDeleteClick}
      >
        ❌
      </button>
    </section>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string,
    isCompleted: PropTypes.bool,
  }).isRequired,
};

export default TodoItem;
