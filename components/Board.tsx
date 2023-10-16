'use client'
import React, { FormEvent, useState } from 'react'
import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragStartEvent,
    DragOverEvent,
    DragEndEvent,
    DropAnimation,
    defaultDropAnimation
  } from "@dnd-kit/core";

import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { BoardSections as BoardSectionsType } from '../types';
import BoardSection from '@/components/BoardSection';
import TaskItem from './TaskItem';
import { INITIAL_TASKS } from '@/data';
import { findBoardSectionContainer, initializeBoard } from '@/utils/board';
import { getTaskById } from '@/utils/tasks';
import { useDataStore } from '@/state/state';



const Board = () => {

    const [showInput, setShowInput] = useState(false)
    const [nameList, setNameList ] = useState('')
  

    const tasks = useDataStore((state) => state.tasks)

    // const tasks = INITIAL_TASKS;
    
    const initialBoardSections = initializeBoard(tasks);
    const [boardSections, setBoardSections] =
    useState<BoardSectionsType>(initialBoardSections);

  const [activeTaskId, setActiveTaskId] = useState<null | string>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = ({ active }: DragStartEvent) => {
    console.log(active);
    
    setActiveTaskId(active.id as string);
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    // Find the containers
    const activeContainer = findBoardSectionContainer(
      boardSections,
      active.id as string
    );
    const overContainer = findBoardSectionContainer(
      boardSections,
      over?.id as string
    );

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setBoardSections((boardSection) => {
      const activeItems = boardSection[activeContainer];
      const overItems = boardSection[overContainer];

      // Find the indexes for the items
      const activeIndex = activeItems.findIndex(
        (item) => item.id === active.id
      );
      const overIndex = overItems.findIndex((item) => item.id !== over?.id);

      return {
        ...boardSection,
        [activeContainer]: [
          ...boardSection[activeContainer].filter(
            (item) => item.id !== active.id
          ),
        ],
        [overContainer]: [
          ...boardSection[overContainer].slice(0, overIndex),
          boardSections[activeContainer][activeIndex],
          ...boardSection[overContainer].slice(
            overIndex,
            boardSection[overContainer].length
          ),
        ],
      };
    });
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    const activeContainer = findBoardSectionContainer(
      boardSections,
      active.id as string
    );
    const overContainer = findBoardSectionContainer(
      boardSections,
      over?.id as string
    );

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = boardSections[activeContainer].findIndex(
      (task) => task.id === active.id
    );
    const overIndex = boardSections[overContainer].findIndex(
      (task) => task.id === over?.id
    );

    if (activeIndex !== overIndex) {
      setBoardSections((boardSection) => ({
        ...boardSection,
        [overContainer]: arrayMove(
          boardSection[overContainer],
          activeIndex,
          overIndex
        ),
      }));
    }

    setActiveTaskId(null);
  };

  const dropAnimation: DropAnimation = {
    ...defaultDropAnimation,
  };

  const task = activeTaskId ? getTaskById(tasks, activeTaskId) : null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    console.log(nameList, boardSections);

    setBoardSections(prev => ({
      ...prev,
      [nameList]: []
    }))

    setShowInput(false)
  }

  return (
    <div className='flex justify-center'>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-row gap-2 bg-slate-300">
          {Object.keys(boardSections).map((boardSectionKey) => (
            <div className='p-1 bg-slate-600 w-40' key={boardSectionKey}>
              <BoardSection
                id={boardSectionKey}
                title={boardSectionKey}
                tasks={boardSections[boardSectionKey]}
                setTaskBoard={setBoardSections}
              />
            </div>
          ))}
          {
            showInput
            ?
            <form onSubmit={handleSubmit}>
              <div>
                <input type="text" placeholder="Name" onChange={(e) => setNameList(e.target.value)} />
                <button type="submit">Create</button>
              </div>
            </form>
            :
            <button type="submit" onClick={() => setShowInput(true)}>Add new list</button>
          }
          <DragOverlay dropAnimation={dropAnimation}>
            {task ? <TaskItem task={task} /> : null}
          </DragOverlay>
        </div>
      </DndContext>
    </div>
  );

}

export default Board