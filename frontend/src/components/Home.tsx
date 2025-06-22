import { TaskList } from "./TaskContext"
import { TimerDetailsForm } from "./TimerDetailsForm";
import { Row, Col } from "react-bootstrap";

export default function Home() {
  
  return (
    <div>
      <Row>
        <Col>
          <h1>Timer App</h1>
          <TimerDetailsForm>
          </TimerDetailsForm>
        </Col>
      </Row>

      <hr></hr>
      <TaskList>
      </TaskList>
     </div>
   )
}