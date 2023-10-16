import React, { useState, FormEvent } from "react";
import { useDroppable } from "@dnd-kit/core";
import { v4 as uuidv4 } from 'uuid';
import {
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { BoardSections, Task } from "@/types";
import SortableTaskItem from "./SortableItem";
import TaskItem from "./TaskItem";
import { useDataStore } from "@/state/state";

type BoardSectionProps = {
  id: string;
  title: string;
  tasks: Task[];
  setTaskBoard: (value: BoardSections) => void;
};

export default function BoardSection({id, title, tasks, setTaskBoard}:BoardSectionProps) {
  
  const insertTask = useDataStore((state) => state.insertTask)
  const [showInput, setShowInput] = useState(false)
  const [nameTask, setNameTask] = useState('')

  const { setNodeRef } = useDroppable({
    id,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    console.log(nameTask);
    
    const newTask = {
      id: uuidv4(),
      title: nameTask,
      description: '',
      status: id,
    }

    console.log(newTask);
    
    setTaskBoard(prev  => ({
      ...prev,
      [id]: [...prev[id], newTask]
    }))

    
    insertTask(newTask)

    setShowInput(false)
  }

  return (
    <div className="p-2">
      <h6 className="text-lg text-cyan-500">
        {title}
      </h6>
      <SortableContext
        id={id}
        items={tasks}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef} className="flex flex-col gap-1">
          {tasks.map((task) => (
            <div  key={task.id} >
              <SortableTaskItem id={task.id}>
                <TaskItem task={task} />
              </SortableTaskItem>
            </div>
          ))}

          {
            showInput
            ?
            <form onSubmit={handleSubmit}>
              <div>
                <input type="text" placeholder="Name" onChange={(e) => setNameTask(e.target.value)} />
                <button type="submit">Create</button>
              </div>
            </form>
            :
            <button type="submit" onClick={() => setShowInput(true)}>Add new list</button>
          }
        </div>
      </SortableContext>
    </div>
  );
}