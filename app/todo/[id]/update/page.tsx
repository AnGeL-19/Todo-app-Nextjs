"use client"
import React, {useState,useEffect} from 'react'
import { useRouter } from 'next/navigation'

import { PageProps } from '../../../.next/types/app/todo/[id]/update/page';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { RespCategory, RespTodoById, Todo } from '@/interface/todo';
import { InputItemCategory } from '@/components/InputItemCategory';

const UpdateTodo = ({params}:PageProps) => {

  const route = useRouter()
  const queryClient = useQueryClient()

  const { isLoading: isLoadingCategories, error: errorCategories, data: categories } = useQuery<RespCategory>('listCategories', () =>
  fetch('http://localhost:8080/api/v1/category/').then(res =>
    res.json()
  ))

  const { isLoading, error, data } = useQuery<RespTodoById>('todoByIdUpdate', () =>
    fetch(`http://localhost:8080/api/v1/todo/${params.id}`).then(res =>
      res.json()
  ))

  const [todo, setTodo] =  useState<Todo>({
    name_todo: '',
    categories: [],
  })

  useEffect(() => {
    setTodo({
      name_todo: data?.data.name_todo || '',
      categories: data?.data.categories || [],
    })
  }, [data,categories])
  

  const mutation = useMutation((data) =>
  fetch(`http://localhost:8080/api/v1/todo/${params.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  }),{
    onSuccess: (data) => {
      // Invalidate and refetch
      // queryClient.invalidateQueries('todos')
      console.log('se actualizo', data );

      
      
    },
    onError: (error, variables, context) => {
      // I will fire first
      console.log('Error!',error);
      
    },
  })

  

  const handleOnChange = (e: any ) => {

    if (e.target.type === 'checkbox') {

        const existsCategory = todo.categories.find( c => c.name_category === e.target.value)

        if (existsCategory) {
          setTodo(res => ({
            ...res,
            categories: [...res.categories.filter( c => c.id_category != existsCategory.id_category)] 
          }))
        }else{
          const category =  categories?.data.find( c => c.name_category === e.target.value);
          if (!category) return;
  
          setTodo(res => ({
            ...res,
            categories: [...res.categories, category] 
          }))
        }

        
    }else{
      
      setTodo(res => ({
        ...res,
        [e.target.name]: e.target.value
      }))

    }
    
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();

    console.log(todo);
    mutation.mutate(todo)

    setTodo({
      name_todo: '',
      categories: [],
    })

  }

  return (
    <main className="w-full min-h-screen ">

      <button onClick={() => route.back()} className="mb-5">Back</button>

      <section className="flex justify-center ">
        <div className="w-[300px] p-1 bg-slate-500 rounded-md ">
          <span className="text-center">Update Todo {params.id}</span>
          <form onSubmit={handleSubmit} className="flex flex-col gap-1">
            <label htmlFor="name-todo" className="flex flex-col gap-1">
              <span className="text-white font-medium">Name</span>
              <input 
                    type="text" 
                    name="name_todo" 
                    placeholder="Insert todo" 
                    id="name-todo" 
                    className="p-2 rounded-sm outline-none"
                    value={todo.name_todo}
                    onChange={handleOnChange}
              />
            </label>

            <ul className='flex flex-row gap-1 flex-wrap'>
              {
                isLoadingCategories
                ? <span>Loading...</span>
                : 
                categories?.data.map( category => (
                  <InputItemCategory key={category.id_category}
                  id={category.id_category} 
                  name={category.name_category} 
                  color={category.color}
                  onChange={handleOnChange}
                  categories={todo.categories}
                  />
                ))
                
              }
            </ul>
              
              
     
            

            <button type="submit" className="px-1 text-white text-lg bg-cyan-500 rounded">Save</button>
          </form>
        </div>
      </section>
      

    </main>
  )
}

export default UpdateTodo