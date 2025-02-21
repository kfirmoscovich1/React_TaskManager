<<<<<<< HEAD
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addTask } from '../service/connections';
import { getCurrentUserId } from '../service/auth';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CreateTaskForm() {
  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !assignedTo || !description || !dueDate) {
        console.error("Please fill in all required fields.");
        return;
    }

    try {
        const userId = await getCurrentUserId();

        const taskData = {
            title,
            assignedTo,
            description,
            dueDate: dueDate && !isNaN(new Date(dueDate).getTime()) ? new Date(dueDate) : null,
            priority,
            userId,
        };

        await addTask(taskData);

        console.log("Task added successfully!");

        sessionStorage.setItem("newTaskTitle", title);

        navigate("/", { state: { newTaskAdded: true, newTaskTitle: title } });

    } catch (error) {
        console.error("Error adding task:", error);
    }
};


  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="row justify-content-center w-100">
        <div className="col-12 col-md-6 col-lg-5">
          <h2 className="text-center mb-4">Create New Task</h2>
          <form onSubmit={handleSubmit} className="p-4 border rounded shadow bg-white">
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Assigned to</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter employee name"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                placeholder="Describe the task"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Priority</label>
              <div className="d-flex justify-content-between">
                <button
                  type="button"
                  className={`btn ${priority === "High" ? "btn-danger" : "btn-outline-danger"} flex-fill mx-1`}
                  onClick={() => setPriority("High")}
                >
                  High
                </button>
                <button
                  type="button"
                  className={`btn ${priority === "Medium" ? "btn-warning" : "btn-outline-warning"} flex-fill mx-1`}
                  onClick={() => setPriority("Medium")}
                >
                  Medium
                </button>
                <button
                  type="button"
                  className={`btn ${priority === "Low" ? "btn-success" : "btn-outline-success"} flex-fill mx-1`}
                  onClick={() => setPriority("Low")}
                >
                  Low
                </button>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Due Date</label>
              <input
                type="date"
                className="form-control"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-success w-100">
              Create Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
=======
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addTask } from '../service/connections';
import { getCurrentUserId } from '../service/auth';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CreateTaskForm() {
  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !assignedTo || !description || !dueDate) {
        console.error("Please fill in all required fields.");
        return;
    }

    try {
        const userId = await getCurrentUserId();

        const taskData = {
            title,
            assignedTo,
            description,
            dueDate: dueDate && !isNaN(new Date(dueDate).getTime()) ? new Date(dueDate) : null,
            priority,
            userId,
        };

        await addTask(taskData);

        console.log("Task added successfully!");

        sessionStorage.setItem("newTaskTitle", title);

        navigate("/", { state: { newTaskAdded: true, newTaskTitle: title } });

    } catch (error) {
        console.error("Error adding task:", error);
    }
};


  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="row justify-content-center w-100">
        <div className="col-12 col-md-6 col-lg-5">
          <h2 className="text-center mb-4">Create New Task</h2>
          <form onSubmit={handleSubmit} className="p-4 border rounded shadow bg-white">
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Assigned to</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter employee name"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                placeholder="Describe the task"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Priority</label>
              <div className="d-flex justify-content-between">
                <button
                  type="button"
                  className={`btn ${priority === "High" ? "btn-danger" : "btn-outline-danger"} flex-fill mx-1`}
                  onClick={() => setPriority("High")}
                >
                  High
                </button>
                <button
                  type="button"
                  className={`btn ${priority === "Medium" ? "btn-warning" : "btn-outline-warning"} flex-fill mx-1`}
                  onClick={() => setPriority("Medium")}
                >
                  Medium
                </button>
                <button
                  type="button"
                  className={`btn ${priority === "Low" ? "btn-success" : "btn-outline-success"} flex-fill mx-1`}
                  onClick={() => setPriority("Low")}
                >
                  Low
                </button>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Due Date</label>
              <input
                type="date"
                className="form-control"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-success w-100">
              Create Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
>>>>>>> b892819 (Initial commit)
