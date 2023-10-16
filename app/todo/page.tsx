import React from 'react'
import Link from 'next/link';




const TodoPage = () => {
  return (
    <div className="w-full flex flex-row justify-center items-center gap-3">
      
      <Link href="/todo/create" className="px-2 py-1 text-base bg-slate-500 rounded" >
        <span className="text-cyan-400">Create new Todo</span>
      </Link>

      <Link href="/category/create" className="px-2 py-1 text-base bg-slate-500 rounded" >
        <span className="text-cyan-400">Create new Category</span>
      </Link>

    </div>
  )
}

export default TodoPage