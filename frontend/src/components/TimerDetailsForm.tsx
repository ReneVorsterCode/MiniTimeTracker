import React, { useState } from "react";
import { useTaskContext } from "./TaskContext";
import { type Task } from "./TaskContext";
import { Button, Modal, Form, FormGroup } from "react-bootstrap";

export const TimerDetailsForm: React.FC = () => {
  const { addTask } = useTaskContext();
  const [newTaskName, setNewTaskName] = useState("");
  const [newHoursWorked, setNewHoursWorked] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleAddTask = () => {
    const newTask: Task = {
      taskName: newTaskName,
      hoursWorked: newHoursWorked,
    };
    addTask(newTask);
    handleClose();
  };

  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Button onClick={handleShow}>Add Task</Button>

     <Modal show={showModal} onHide={handleClose}>
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>New Task</Modal.Title>
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
                <Form.Label>Hours Spent on Task</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter hours spent on task"
                  value={newHoursWorked}
                  onChange={(e) => setNewHoursWorked(Number(e.target.value))}
                />
              </FormGroup>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
            <Button variant="primary" onClick={handleAddTask}>Save Task</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </div>
  )
}