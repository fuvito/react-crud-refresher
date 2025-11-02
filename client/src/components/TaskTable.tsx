import React from "react";
import type {Task} from "../model/types.ts";


interface Props {
  tasks: Task[];
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
}

const TaskTable: React.FC<Props> = ({tasks, onDelete, onEdit}) => {
  return (
    <table style={{width: "100%", borderCollapse: "collapse"}}>
      <thead>
      <tr>
        <th style={{borderBottom: "1px solud #ccc"}}>Title</th>
        <th style={{borderBottom: "1px solud #ccc"}}>Description</th>
        <th style={{borderBottom: "1px solud #ccc"}}>Completed</th>
        <th style={{borderBottom: "1px solud #ccc"}}>Actions</th>
      </tr>
      </thead>
      <tbody>
      {tasks.map(task => (
          <tr key={ task.id }>
            <td>{ task.title }</td>
            <td>{ task.description }</td>
            <td>{ task.completed ? "✅" : "❌" }</td>
            <td>
              <button onClick={() => onEdit(task)}>Edit</button>
              <button onClick={() => onDelete(task.id)}>Delete</button>
            </td>
          </tr>
        ))
      }
      </tbody>
    </table>
  )
}

export default TaskTable;
