import express, {Request, Response} from "express";
import cors from "cors";
import {Task} from "./types";
import {tasks as seedTasks} from "./fakedb";

const app = express();
app.use(cors());
app.use(express.json());

let tasks: Task[] = [...seedTasks];


// list
app.get("/tasks", (req: Request, res: Response)=> {
  res.json(tasks);
});

// create
app.post("/tasks", (req: Request, res: Response)=> {
  const newTask: Task = {id: Date.now(), ...req.body};
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// update
app.put("/tasks/:id", (req: Request, res: Response)=> {
  const id = Number(req.params.id);
  tasks = tasks.map(t => (t.id === id ? {...t, ...req.body} : t));
  res.status(204).send();
});

// delete
app.delete("/tasks/:id", (req: Request, res: Response)=> {
  const id = Number(req.params.id);
  tasks = tasks.filter(t => t.id !== id);
  res.status(204).send();
});

// get by id
app.get("/tasks/:id", (req: Request, res: Response)=> {
  const id = Number(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (!task) {
    res.status(404).send();
    return;
  }
  res.json(task);
});

const PORT = 4000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
