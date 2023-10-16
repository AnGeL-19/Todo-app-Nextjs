'use client'

import { useDataStore } from "@/state/state"
import Link from "next/link"

function BearCounter() {
  const bears = useDataStore((state) => state.bears)
  return <h1>{bears} around here ...</h1>
}

function Controls() {
  const increasePopulation = useDataStore((state) => state.increasePopulation)
  const removeAllBears = useDataStore((state) => state.removeAllBears)

  return <>
    <button onClick={increasePopulation}>one up</button>
    <button onClick={removeAllBears}>Reset</button>
  </>
}

export default function Home() {

  
  
  return (
    <div className="h-screen bg-neutral-800 flex flex-col justify-center items-center gap-5" >
      <h1 className="text-7xl font-sans text-slate-50 font-bold">APP TODOS</h1>

      <section className="flex flex-col gap-2">

        <div>
          <h2 className="font-sans text-slate-50 text-2xl mb-2">Description</h2>
          <p className="font-sans text-slate-400">This application learned how to craete a CRUD whit NEXT.JS and does fetching whit an API.</p>
        </div>
        
        <div>
          <h2 className="font-sans text-slate-50 text-2xl mb-2">Functions</h2>
          <ul className="flex flex-row flex-wrap gap-2">

            <li className="px-1 rounded bg-green-300">
              <span className="font-semibold text-xs">Create Todo</span>
            </li>
            <li className="px-1 rounded bg-blue-300">
              <span className="font-semibold text-xs">List Todo</span>
            </li>
            <li className="px-1 rounded bg-yellow-300">
              <span className="font-semibold text-xs">Update Todo</span>
            </li>
            <li className="px-1 rounded bg-red-300">
              <span className="font-semibold text-xs">Delete Todo</span>
            </li>
            <li className="px-1 rounded bg-green-300">
              <span className="font-semibold text-xs">Create Category</span>
            </li>
            <li className="px-1 rounded bg-blue-300">
              <span className="font-semibold text-xs">List Category</span>
            </li>
            <li className="px-1 rounded bg-yellow-300">
              <span className="font-semibold text-xs">Update Category</span>
            </li>
            <li className="px-1 rounded bg-red-300">
              <span className="font-semibold text-xs">Delete Category</span>
            </li>
            
          </ul>
        </div>
        
      </section>
    </div>
  )
}
