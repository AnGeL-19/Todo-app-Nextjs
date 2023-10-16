import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useMutation } from 'react-query';

interface Props{
    id: number;
    name: string;
    query: string;
}

export const ListItem = ({id,name,query}:Props) => {

  const route = useRouter()

  const mutation = useMutation((idTodo) =>
  fetch(`http://localhost:8080/api/v1/${query}/${idTodo}`, {
    method: 'DELETE',
  }),{
    onSuccess: (data) => {
      // Invalidate and refetch
      // queryClient.invalidateQueries('todos')
      console.log('se Elimino', data );

    },
    onError: (error, variables, context) => {
      // I will fire first
      console.log('Error!',error);
      
    },
  })

  const handleDelete = (id: number) => {

    mutation.mutate(id)
    console.log(id, 'para el liminar');
    route.replace(`/${query}`)
   
    

  }


  return (
    <li key={id} className='flex flex-row  min-w-[300px] max-w-md p-2 bg-slate-50 shadow-sm rounded border border-gray-100'>
        <Link  href={`/${query}/${id}`} className='block w-full h-full' >
        <span className="text-lg text-gray-500  ">{name}</span>
        </Link>
        <div className="flex flex-row gap-3 justify-center items-center">
        <Link href={`/${query}/${id}/update`} className="bg-blue-200 rounded px-2 text-neutral-700">
            Edit
        </Link>
        <button className="bg-red-200 rounded px-2 text-neutral-700"
          onClick={ () => handleDelete(id) }
        >
          Delete
        </button>
        </div>
    </li> 
  )
}
