import React, { createContext, useContext, useState } from 'react';
import { type ReactNode } from 'react';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

// Since we're using typescript and react,
// we will use a context to manage the state of the tasks
// To start context setup, we create an interface for Task structure
export interface Task {
  taskName: string;
  secondsWorked: number;
}

// We define our context value interface which is passed to child objects
// through Provider
interface TaskContextValue {
  tasks: Task[];
  addTask: (task: Task) => void;
  removeTask: (index: number) => void;
  editTask: (index: number, updatedTask: Task) => void;
  setTasks: (tasks: Task[]) => void;
}

// Create our context and acknowledge that it can be undefined
const TaskContext = createContext<TaskContextValue | undefined>(undefined);

// Create a custom hook for using the TaskContext
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}

// Create provider component props
interface TaskProviderProps {
  children: ReactNode;
}

// Our provider component that will wrap around the app
export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const removeTask = (index: number) => {
    setTasks(prev => prev.filter((_, i) => i !== index));
  };

  const editTask = (index: number, editedTask: Task) => {
    setTasks(prev => prev.map((task, i) => (i === index ? editedTask : task)));
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, removeTask, editTask, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

// Component to show task list
export const TaskList: React.FC = () => {
  const { tasks, editTask, removeTask } = useTaskContext();

  return (
    <div>
      <h2>Current Task List</h2>
      <p>Total Hours of Work: {Math.floor(tasks.reduce((sum, task) => sum + task.secondsWorked, 0) / 3600)} Hours {" "}
        {Math.floor(tasks.reduce((sum, task) => sum + task.secondsWorked, 0) / 3600) % 60} Minutes {" "}
        {tasks.reduce((sum, task) => sum + task.secondsWorked, 0) % 60} Seconds
      </p>
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>
                  Worked on <strong>{task.taskName}</strong> for <strong>{Math.floor(task.secondsWorked / 3600)} Hours {Math.floor(task.secondsWorked / 60) % 60} Minutes {task.secondsWorked % 60} Seconds</strong> {" "}
                <Button variant="warning" onClick={() => editTask(index, task)}>Edit Task</Button>
                <Button variant="danger" onClick={() => removeTask(index)}>Remove Task</Button>
              </li>
            ))}
        </ul>
    </div>
  )
}