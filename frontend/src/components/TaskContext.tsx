import React, { createContext, useContext, useState } from 'react';
import { type ReactNode } from 'react';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import { Button, Modal, Form, FormGroup, Row, Col} from 'react-bootstrap';

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
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [currentlySelectedIndex, setCurrentlySelectedIndex] = useState<number>(-1);

  const [newTaskName, setNewTaskName] = useState<string>("");
  const [formSeconds, setFormSeconds] = useState<number>(0);
  const [formMinutes, setFormMinutes] = useState<number>(0);
  const [formHours, setFormHours] = useState<number>(0);

  const handleCloseEdit = () => setShowEditModal(false);
  const handleShowEdit = (taskId: number) => {
    setCurrentlySelectedIndex(taskId);

    setNewTaskName(tasks[taskId]?.taskName || "");
    setFormSeconds(tasks[taskId]?.secondsWorked % 60 || 0);
    setFormMinutes(Math.floor((tasks[taskId]?.secondsWorked || 0) / 60) % 60 || 0);
    setFormHours(Math.floor((tasks[taskId]?.secondsWorked || 0) / 3600) || 0);

    setShowEditModal(true);
  }

  const handleUpdateTask = () => {
    if (currentlySelectedIndex < 0 || currentlySelectedIndex >= tasks.length) {
      alert("Invalid task selected for editing.");
      return;
    }

    // Check for relevant errors like having no task name and invalid time inputs
    if (!newTaskName) {
      alert("Please enter valid task name.");
      return;
    }
    if (formSeconds < 0 || formMinutes < 0 || formHours < 0) {
      alert("Please provide valid time for task.");
      return;
    }

    // If all inputs are zero, we don't update the task
    if (formSeconds <= 0 && formMinutes <= 0 && formHours <= 0) {
      alert("Please provide time of task.");
      return;
    }

    // Calculate total seconds worked from form data
    const calculatedSecondsWorked = formSeconds + (formMinutes * 60) + (formHours * 3600);

    const updatedTask: Task = {
      taskName: newTaskName,
      secondsWorked: calculatedSecondsWorked,
    };

    editTask(currentlySelectedIndex, updatedTask);
    handleCloseEdit();
  }

  return (
    <div>
    <div>
      <h2>Current Task List</h2>
      <p>Total Hours of Work: {Math.floor(tasks.reduce((sum, task) => sum + task.secondsWorked, 0) / 3600)} Hours {" "}
        {Math.floor(tasks.reduce((sum, task) => sum + task.secondsWorked, 0) / 60) % 60} Minutes {" "}
        {tasks.reduce((sum, task) => sum + task.secondsWorked, 0) % 60} Seconds
      </p>
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>
                  Worked on <strong>{task.taskName}</strong> for <strong>{Math.floor(task.secondsWorked / 3600)} Hours {Math.floor(task.secondsWorked / 60) % 60} Minutes {task.secondsWorked % 60} Seconds</strong> {" "}
                <Button variant="warning" onClick={() => (handleShowEdit(index))}>Edit Task</Button>
                <Button variant="danger" onClick={() => removeTask(index)}>Remove Task</Button>
              </li>
            ))}
        </ul>
    </div>

    <Modal show={showEditModal} onHide={handleCloseEdit}>
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Editing Task</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <FormGroup>
                <Form.Label>Task Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter task name"
                  value={newTaskName}
                  onChange={(e) => setNewTaskName(e.target.value)}
                />
                  <div>
                    <Row>
                      <Col>
                        <Form.Label>Hours</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Hours"
                          value={formHours}
                          onChange={(e) => setFormHours(Number(e.target.value))}
                        />
                      </Col>
                      <Col>
                        <Form.Label>Minutes</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Minutes"
                          value={formMinutes}
                          onChange={(e) => setFormMinutes(Number(e.target.value))}
                        />
                      </Col>
                      <Col>
                        <Form.Label>Seconds</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Seconds"
                          value={formSeconds}
                          onChange={(e) => setFormSeconds(Number(e.target.value))}
                        />
                      </Col>
                    </Row>
                    </div>
              </FormGroup>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={() => (handleCloseEdit())}>Close</Button>
                <div>
                  <Button variant="primary" onClick={handleUpdateTask}>Update Task</Button>
                </div>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
      </div>
  )
}