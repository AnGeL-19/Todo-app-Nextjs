import { Task } from '@/types';
import React from 'react';

type TaskItemProps = {
    task: Task;
  };
  
  const TaskItem = ({ task }: TaskItemProps) => {
  
    return (
      <div className="w-full p-1 bg-red-500">
        <span>{task.title}</span>
        <p>{task.description}</p>
      </div>
    );
  };
  
export default TaskItem;