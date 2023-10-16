import { Category } from '@/interface/todo';
import React, { useLayoutEffect, useRef } from 'react'

interface Props{
    category: Category;
}

export const ItemCategory = ({category}:Props) => {

    const bgInput = useRef<HTMLLIElement | HTMLLIElement>()

    useLayoutEffect(() => {
        bgInput.current!.style.backgroundColor = category.color;
    }, [])

  return (
    <div ref={bgInput} className={`flex flex-row gap-2 px-2 py-1 rounded`}>
        <span>{category.name_category}</span>
    </div>
  )
}
