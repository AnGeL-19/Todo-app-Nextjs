"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { PageProps } from '../../../.next/types/app/category/[id]/update/page';
import { useMutation, useQuery } from 'react-query';
import { Category, RespCategoryById } from '@/interface/todo';



const UpdateCategory = ({params}:PageProps) => {

  const route = useRouter()

  const { isLoading, error, data } = useQuery<RespCategoryById>('categoryByIdUpdate', () =>
    fetch(`http://localhost:8080/api/v1/category/${params.id}`).then(res =>
      res.json()
    ))

  console.log(params.id);

  const [value, setValue] = useState<Category>({
    color: '',
    name_category: ''
  })

  useEffect(() => {
    setValue({
      color: data?.data.color || '',
      name_category: data?.data.name_category || ''
    })
  }, [data])
  

  const mutation = useMutation((data) =>
  fetch(`http://localhost:8080/api/v1/category/${params.id}`, {
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

  const handleChange = (e: any) => {

    setValue( res => ({
      ...res,
      [e.target.name]: e.target.value
    }))

  }

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
          <span className="text-center text-white">Update Category</span>
          <form onSubmit={handleSubmit} className="flex flex-col gap-1 ">
            <label htmlFor="name-todo" className="flex flex-col gap-1">
              <span className="text-white font-medium">Name </span>
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
                <span></span>
              </div>
              
            </label>
            <button type="submit" className="px-1 text-white text-lg bg-cyan-500 rounded">Save</button>
          </form>
        </div>
      </section>
  
    </main>
  )
}

export default UpdateCategory