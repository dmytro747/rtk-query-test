import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001'
  }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getAll: builder.query<Todo[], void>({
      query: () => 'todos',
      providesTags: [{ type: 'Todos', id: 'LIST' }]
    }),
    updateTodo: builder.mutation<Todo, Todo>({
      query: (todo) => ({
        url: `todos/${todo.id}`,
        method: 'PUT',
        body: todo,
      }),
      invalidatesTags: [{ type: 'Todos', id: 'LIST' }]
    }),
    deleteTodo: builder.mutation<void, number>({
      query: (todoId) => ({
        url: `todos/${todoId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Todos', id: 'LIST' }]
    }),
    addTodo: builder.mutation<Todo, Omit<Todo, 'id'>>({
      query: (todo) => ({
        url: 'todos',
        method: 'POST',
        body: todo,
      }),
      invalidatesTags: [{ type: 'Todos', id: 'LIST' }]
    })

  })

});