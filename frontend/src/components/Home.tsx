import { TaskList } from "./TaskContext"
import { TimerDetailsForm } from "./TimerDetailsForm";

export default function Home() {
  
  return (
    <div>
      <h1>Timer App</h1>
      <TimerDetailsForm>
      </TimerDetailsForm>
      <hr></hr>
      <TaskList>
      </TaskList>
    </div>
    
   )
}