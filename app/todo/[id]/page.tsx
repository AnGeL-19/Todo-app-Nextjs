"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { PageProps } from '../../../.next/types/app/todo/[id]/page';
import { useQuery } from 'react-query';
import { RespTodoById } from '@/interface/todo';
import { ItemCategory } from '@/components/ItemCategory';



const TodoById = ({params}:PageProps) => {

    const route = useRouter()
    const { isLoading, error, data } = useQuery<RespTodoById>('listCategoriesById', () =>
    fetch(`http://localhost:8080/api/v1/todo/${params.id}`).then(res =>
      res.json()
    ))

    if (!data || error || !data.status) {
        console.log('SI ENTRAAAAA');
        
        route.replace('/todo');

    }

    return (
    <div className='w-full h-full'>

        <button onClick={() => route.back()}>Back</button>

        <section className='flex justify-center'>

            {
                isLoading
                ?
                <span>Loading...</span>
                :
                <article className='flex flex-row justify-between gap-1 items-center min-w-[300px] max-w-md p-2 bg-slate-50 shadow-lg rounded border border-gray-100'>
                    <h4>{data?.data.name_todo}</h4>
                    <div className='flex flex-col justify-between gap-2 items-end w-[65%]'>

                        <div className='flex items-center'>
                            <span className='text-sm font-medium text-gray-500'>{data?.data.create_at}</span>
                        </div>

                        <div className='flex flex-row flex-wrap justify-end gap-[2px] w-full'>
                            {
                                data?.data.categories.map( c => (
                                    <ItemCategory key={c.id_category} category={c} />
                                ))
                            } 
                        </div>
                        
                    </div>
                </article>
            }
            

        </section>      
        
    </div>
  )
}

export default TodoById 