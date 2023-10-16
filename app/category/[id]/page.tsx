"use client"

import React from 'react'
import { PageProps } from '../../../.next/types/app/category/[id]/page';
import { useRouter } from 'next/navigation';
import { useQuery } from 'react-query';
import { RespCategoryById } from '@/interface/todo';


const CategoryById = ({params}:PageProps) => {

    const route = useRouter()
    const { isLoading, error, data } = useQuery<RespCategoryById>('listCategoriesById', () =>
    fetch(`http://localhost:8080/api/v1/category/${params.id}`).then(res =>
      res.json()
    ))

  return (
    <div className='w-full h-full'>

    <button onClick={() => route.back()}>Back</button>

    <section className='flex justify-center'>

        <article className='flex flex-row justify-between gap-1 items-center min-w-[300px] max-w-md p-2 bg-slate-50 shadow-lg rounded border border-gray-100'>
            <h4>{data?.data.name_category}</h4>
            <div className='flex flex-col justify-between gap-2 items-end w-[65%]'>

                <div>Color</div>
                
            </div>
        </article>

    </section>      
    
</div>
  )
}

export default CategoryById