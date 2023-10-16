'use client'
import { Category, Todo, TodoWhitId } from '@/interface/todo';
import React, {useRef,useLayoutEffect} from 'react'

interface Props{
    id: number,
    name: string,
    color: string,
    onChange: (value: any) => void;
    categories: Category[];
}


export const InputItemCategory = ({id, name, color, onChange, categories}:Props) => {

    const bgInput = useRef<HTMLLIElement | HTMLLIElement>()

    useLayoutEffect(() => {
        bgInput.current!.style.backgroundColor = color;
    }, [])

  return (
    <li ref={bgInput}
        key={id} 
        className={`flex flex-row gap-2 px-2 py-1 rounded`}
    >
        <input type="checkbox" 
        id={`${id}`} 
        name="name_category" 
        value={name} 
        onChange={onChange}
        checked={ categories.find( c => c.id_category === id) ? true : false }
        />
        <label htmlFor={`${id}`}>{name}</label>
    </li>
  )
}
