import React, { useCallback, useRef } from 'react';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { todoApi, Todo } from './store';
import './App.css';


function TodoApp() {
  const { data: todos, isLoading: isFetching } = todoApi.useGetAllQuery();
  const [updateTodo, { isLoading: isUpdating }] = todoApi.useUpdateTodoMutation();
  const [deleteTodo, { isLoading: isDeleting }] = todoApi.useDeleteTodoMutation();
  const [addTodo, { isLoading: isAdding }] = todoApi.useAddTodoMutation();

  const textRef = useRef<HTMLInputElement>(null);

  const onToggle = useCallback((todo: Todo) => {
    updateTodo({ ...todo, completed: !todo.completed });
  }, [updateTodo]);

  const onDelete = useCallback((todoId: number) => {
    deleteTodo(todoId);
  }, [deleteTodo]);

  const onAdd = useCallback(() => {
    addTodo({
      completed: false,
      title: textRef.current!.value ?? "",
      userId: 1,
    });
  }, [addTodo]);

  // is there a way to get a busy status from a hook? 
  const isBusy = isFetching || isUpdating || isDeleting || isAdding;


  return (
    <div className="App">
      <div className="todos">
        {todos?.map((todo) => (
          <React.Fragment key={todo.id}>
            <div>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => { onToggle(todo) }}
              />
              <span>{todo.title}</span>
            </div>
            <button onClick={() => { onDelete(todo.id) }}>Delete</button>
          </React.Fragment>
        ))}
      </div>
      <div className="add">
        <input type="text" ref={textRef} />
        <button onClick={onAdd}>Add</button>
      </div>
      {
        isBusy && <div className="overlay">Loading...</div>
      }
    </div >
  );
}

function App() {
  return (
    <ApiProvider api={todoApi}>
      <TodoApp />
    </ApiProvider>
  );
}

export default App;
