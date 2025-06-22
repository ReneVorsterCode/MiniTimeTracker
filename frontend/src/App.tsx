import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { TaskProvider } from './components/TaskContext'
import Home from './components/Home'


function App() {

  return (
    <TaskProvider>
      <Home>
      </Home>
    </TaskProvider>
  )
}

export default App
