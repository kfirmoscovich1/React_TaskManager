import React, { useState } from "react";
import imgDelete from "../images/delete.png";
import imgUser from "../images/user.png";
import imgDate from "../images/date.png";

export default function TaskItem({ task, onDelete, onDone, onArchive }) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const getBorderColor = () => {
    if (task.status === "Done" || task.status === "archived") {
      return "gray";
    }
    switch (task.priority) {
      case "High":
        return "red";
      case "Medium":
        return "orange";
      case "Low":
        return "green";
      default:
        return "gray";
    }
  };

  return (
    <div
      className={`card h-100 card-transition ${
        task.status === "Done" || task.status === "archived"
          ? "bg-secondary text-white"
          : ""
      }`}
      style={{
        border: `3px solid ${getBorderColor()}`,
        minHeight: "250px",
      }}
    >
      <div className="card-body d-flex flex-column">
        {task.status !== "archived" && (
          <button
            className="btn position-absolute top-0 end-0"
            style={{
              background: "none",
              border: "none",
              padding: "10px",
              cursor: "pointer",
            }}
            onClick={() => onDelete(task.id)}
          >
            <img
              src={imgDelete}
              alt="Delete"
              style={{ width: "25px", height: "25px" }}
            />
          </button>
        )}

        <div>
          <h5 className="card-title">{task.title}</h5>
          <p className="card-text">
            {showFullDescription
              ? task.description
              : task.description.length > 80
              ? `${task.description.slice(0, 80)}...`
              : task.description}
          </p>
          {task.description.length > 80 && (
            <button
              className="btn btn-link p-0"
              style={{ fontSize: "0.9rem", textDecoration: "underline" }}
              onClick={toggleDescription}
            >
              {showFullDescription ? "Read less" : "Read more"}
            </button>
          )}
        </div>

        <div className="mt-auto">
          <div className="d-flex align-items-center mb-2">
            <img
              src={imgUser}
              alt="User"
              style={{ width: "25px", height: "25px", marginRight: "8px" }}
            />
            <span>{task.assignedTo}</span>
          </div>

          <div className="d-flex align-items-center">
            <img
              src={imgDate}
              alt="Date"
              style={{ width: "25px", height: "25px", marginRight: "8px" }}
            />
            <span>
              {task.dueDate?.toDate
                ? task.dueDate.toDate().toLocaleDateString()
                : task.dueDate}
            </span>
          </div>

          {task.status === "archived" ? null : task.status !== "Done" ? (
            <button
              className="btn btn-outline-success mt-3 w-100 btn-done-transition"
              onClick={() => onDone(task.id)}
            >
              Done
            </button>
          ) : (
            <button
              className="btn btn-outline-light mt-3 w-100 btn-archive-transition"
              onClick={() => onArchive(task.id)}
            >
              to Archive
            </button>
          )}
        </div>
      </div>
    </div>
  );
}