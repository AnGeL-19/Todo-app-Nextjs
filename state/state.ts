import { create } from 'zustand'
import { INITIAL_TASKS } from '@/data';

export const useDataStore = create((set) => ({
  tasks: INITIAL_TASKS,
  insertTask: (value: any) => set((state) => ({ task: state.tasks.push(value) })),
  todos: [],
  insertTodo: (value: any) => set((state) => ({ todos: state.todos.push(value) })),
  deleteTodo: (value: any) => set((state) => ({ 
    todos: state.todos.filter( t => t.id !== value.id)
  })),
  updateTodo: (value: any) => set((state) => {


    const update = state.todos.map((todo) => {

      if (todo.id === value.id) {
        return value;
      }

      return todo;

    })

    return {
      todos: update
    }
  }),
  categories: [],
  insertCategory: (value: any) => set((state) => ({ categories: state.categories.push(value) })),
  deleteCategory: (value: any) => set((state) => ({ 
    categories: state.categories.filter( t => t.id !== value.id)
  })),
  updateCategory: (value: any) => set((state) => {

    const update = state.categories.map((category) => {
      if (category.id === value.id) {
        return value;
      }
      return category;
    })

    return {
      categories: update
    }
  }),
}))