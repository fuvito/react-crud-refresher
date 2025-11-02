import './App.css'
import {useEffect, useState} from "react";
import type {Task} from "./model/types.ts";
import TaskTable from "./components/TaskTable.tsx";

const API_URL = "http://localhost:4000/tasks";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [newTaskDescription, setNewTaskDescription] = useState<string>('');

  // useEffect - runs once on mount: loads tasks
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(setTasks)
      .catch(err => console.error(err));
  }, []);

  const handleDelete = (id: number) => {
    console.log('in handleDelete', id)
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setTasks(tasks.filter(task => task.id !== id))
      })
      .catch(err => console.error(err))
  }

  const handleEdit = (task: Task) => {
    console.log('in handleEdit', task)
    fetch(`${API_URL}/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })
      .then(() => {
        setTasks(tasks.map(t => t.id === task.id ? task : t))
      })
      .catch(err => console.error(err))
  }

  const createTask = () => {
    console.log('in createTask', newTaskTitle, newTaskDescription)
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title: newTaskTitle, description: newTaskDescription})
    })
      .then(res => res.json())
      .then(task => {
        setTasks([...tasks, task])
        setNewTaskTitle('')
        setNewTaskDescription('')
      })
      .catch(err => console.error(err))
  }

  return (
    <>
      <div>
        <h1>Task Manager</h1>
        <div>
          <div>
            <input
              type="text"
              placeholder="Title"
              value={newTaskTitle}
              onChange={e => setNewTaskTitle(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Description"
              value={newTaskDescription}
              onChange={e => setNewTaskDescription(e.target.value)}
            />
          </div>
          <div>
            <button onClick={createTask}>Add Task</button>
          </div>
        </div>
        <div>
          <TaskTable tasks={tasks} onDelete={handleDelete} onEdit={handleEdit}/>
        </div>
      </div>
    </>
  )
}

export default App
