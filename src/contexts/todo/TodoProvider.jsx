import PropTypes from 'prop-types';
import TodoContext from './TodoContext';

function TodoProvider({ value, children }) {
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

TodoProvider.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.shape({
    todos: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        text: PropTypes.string,
        isCompleted: PropTypes.bool,
      })
    ),
    addTodo: PropTypes.func,
    updateTodo: PropTypes.func,
    deleteTodo: PropTypes.func,
    toggleTodo: PropTypes.func,
  }).isRequired,
};

export default TodoProvider;
