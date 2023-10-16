"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from 'react-query'


const CreateCategory = () => {

  const route = useRouter()

  const [value, setValue] = useState({
    color: '',
    name_category: ''
  })

  const handleChange = (e: any) => {

    console.log(e);
    

    setValue( res => ({
      ...res,
      [e.target.name]: e.target.value
    }))

  }

  const mutation = useMutation((data) =>
  fetch('http://localhost:8080/api/v1/category/', {
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


  const handleSubmit = (e: any) => {
    e.preventDefault();

    console.log(value);
    mutation.mutate(value)

    setValue({
      color: '',
      name_category: ''
    })


  }


  return (
    <main className="w-full min-h-screen ">

      <button onClick={() => route.back()} className="mb-5">Back</button>

      <section className="flex justify-center ">
        <div className="w-[300px] p-1 bg-slate-500 rounded-md ">
          <span className="text-center ">Create Category</span>
          <form onSubmit={handleSubmit} className="flex flex-col gap-1 ">
            <label htmlFor="name-todo" className="flex flex-col gap-1">
              <span className="text-white font-medium">Name category</span>
              <input 
                    type="text" 
                    name="name_category" 
                    placeholder="Insert Category" 
                    id="name_category" 
                    className="p-2 rounded-sm outline-none"
                    value={value.name_category}
                    onChange={handleChange}
              />
            </label>
            <label htmlFor="name-todo" className="flex flex-col gap-1">
              <span className="text-white font-medium">Add Color</span>
              <div>
                <input 
                      type="color" 
                      name="color" 
                      placeholder="Insert Color" 
                      id="color-category" 
                      className="w-full P-0"
                      value={value.color}
                      onChange={handleChange}
                />
              </div>
              
            </label>
            <button type="submit" className="px-1 text-white text-lg bg-cyan-500 rounded">Save</button>
          </form>
        </div>
      </section>
  
    </main>
  )
}

export default CreateCategory