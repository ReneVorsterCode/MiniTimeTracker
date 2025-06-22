import React, { useState, useEffect } from "react";
import { useTaskContext } from "./TaskContext";
import { type Task } from "./TaskContext";
import { Button, Modal, Form, FormGroup, Row, Col } from "react-bootstrap";

export const TimerDetailsForm: React.FC = () => {
  const { addTask } = useTaskContext();
  const [newTaskName, setNewTaskName] = useState<string>("");
  const [newSecondsWorked, setNewSecondsWorked] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Form Properties
  const [formSeconds, setFormSeconds] = useState<number>(0);
  const [formMinutes, setFormMinutes] = useState<number>(0);
  const [formHours, setFormHours] = useState<number>(0);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleAddTask = () => {
    // Check for relevant errors like having no task name and invalid time inputs
    if (!newTaskName) {
      alert("Please enter valid task name.");
      return;
    }
    if (formSeconds < 0 || formMinutes < 0 || formHours < 0) {
      alert("Please provide valid time for task.");
      return;
    }

    // Check for additional error, which would be if all time inputs are zero,
    // and timer is not running.
    if (formSeconds <= 0 && formMinutes <= 0 && formHours <= 0) {
      if (!isTimerRunning) {
        alert("Please provide time of task.");
        return;
      }
      // If inputs are zero but timer is running it means we need to pull
      // timer data from newSecondsWorked, not the form data, then add new task
      const newTask: Task = {
        taskName: newTaskName,
        secondsWorked: newSecondsWorked,
    };addTask(newTask);
    } else {
      // If we have valid time inputs, calculate total seconds worked from form data
      // then add new task.
      const calculatedSecondsWorked = formSeconds + (formMinutes * 60) + (formHours * 3600);

      const newTask: Task = {
        taskName: newTaskName,
        secondsWorked: calculatedSecondsWorked,
    };addTask(newTask);
    }
    
    // Reset form data
    handleTimerStop();
    setFormSeconds(0);
    setFormMinutes(0);
    setFormHours(0);
    setNewTaskName("");
    handleClose();
  };

  const handleTimerStart = () => {
    if (!newTaskName) {
      alert("Please enter a task name before starting the timer.");
      return;
    }

    setIsTimerRunning(true);
  }

  const handleTimerPause = () => {
    setIsTimerRunning(false);
    
  }

  const handleTimerStop = () => {
    setIsTimerRunning(false);
    setNewSecondsWorked(0);
  }

  const handleTimerReset = () => {
    setNewSecondsWorked(0);
  }

  const handleSubmitTime = () => {
    handleAddTask();
  }

  useEffect(() => {
    if (isTimerRunning) {
      const timer = setInterval(() => {
        setNewSecondsWorked((prevTime) => prevTime + 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isTimerRunning])

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
                {!isTimerRunning ? (
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
                    </div>) : (
                  <div>
                    <h5>Timer Running: {Math.floor(newSecondsWorked / 3600)} Hours {Math.floor(newSecondsWorked / 60) % 60} Min {newSecondsWorked % 60} Seconds</h5>
                  </div>
                )}
              </FormGroup>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
            {!isTimerRunning ? (
                <div>
                  <Button variant="primary" onClick={handleAddTask}>Save Task</Button>
                <Button variant="info" onClick={() => (handleTimerStart(),
                  setFormSeconds(0),
                  setFormMinutes(0),
                  setFormHours(0)
                  )}>Use Timer</Button>
                </div>) :
              ( <div>
                  <Button variant="info" onClick={handleTimerPause}>Pause</Button>
                  <Button variant="info" onClick={handleTimerReset}>Reset Time</Button>
                  <Button variant="info" onClick={handleSubmitTime}>Submit Time and Task</Button>
                </div>)}
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </div>
  )
}