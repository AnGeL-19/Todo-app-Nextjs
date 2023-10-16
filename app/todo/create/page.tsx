"use client"
import React, { useState } from 'react'
import { RespCategory, Todo } from '@/interface/todo'
import { useRouter } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { InputItemCategory } from '@/components/InputItemCategory'


const CreateTodo = () => {

  const route = useRouter()
  const queryClient = useQueryClient()

  const { isLoading, error, data } = useQuery<RespCategory>('listCategories', () =>
  fetch('http://localhost:8080/api/v1/category/').then(res =>
    res.json()
  ))
  
  const [todo, setTodo] =  useState<Todo>({
    name_todo: '',
    categories: [],
  })

  const mutation = useMutation((data) =>
  fetch('http://localhost:8080/api/v1/todo/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  }),{
    onSuccess: (data) => {
      // Invalidate and refetch
      // queryClient.invalidateQueries('todos')
      console.log('se registro', data );

      
      
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
          const category =  data?.data.find( c => c.name_category === e.target.value);
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
          <span className="text-center">Create Todo</span>
          <form onSubmit={handleSubmit} className="flex flex-col gap-1">
            <label htmlFor="name-todo" className="flex flex-col gap-1">
              <span className="text-white font-medium">Name</span>
              <input 
                    type="text" 
                    name="name_todo" 
                    placeholder="Insert todo" 
                    id="name-todo" 
                    className="p-2 rounded-sm outline-none"
                    onChange={handleOnChange}
                    value={todo.name_todo}
              />
            </label>

            <ul className='flex flex-row gap-1 flex-wrap'>
              {
                isLoading
                ? <span>Loading...</span>
                : 
                data?.data.map( category => (
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

export default CreateTodo