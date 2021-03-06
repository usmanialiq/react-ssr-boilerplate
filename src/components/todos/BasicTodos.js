import React, { useState, useRef, useEffect } from 'react';

import { api } from '../../api';
import { useServerData } from '../../state/serverDataContext';

const BasicTodos = () => {
  const serverTodos = useServerData(data => {
    return data.todos || [];
  });
  const [text, setText] = useState('');
  const [todos, setTodos] = useState(serverTodos);
  const todoInput = useRef(null);
  useEffect(() => {
      todoInput.current.disabled = false;
  }, []);

  return (
    <div>
       <h2>Basic Hydration</h2>
      <form
        onSubmit={e => {
          e.preventDefault();

          const newTodo = {
            text
          };

          api.todos.create(newTodo).then(res => {
            setTodos([...todos, res]);
            setText('');
          });
        }}
      >
        <label htmlFor="todo">Add a todo</label>
        <br />
        <input
          ref={todoInput}
          disabled
          id="basic-todo"
          type="text"
          value={text}
          autoComplete="off"
          onChange={e => setText(e.target.value)}
        />
      </form>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
};

BasicTodos.fetchData = () => {
  return api.todos.all().then(todos => {
    return {
      todos
    };
  });
};

export default BasicTodos;
