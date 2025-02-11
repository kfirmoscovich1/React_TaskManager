import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllTasks as getTasks, deleteTask, updateTask } from "../service/connections";
import TaskItem from "./TaskItem";
import "bootstrap/dist/css/bootstrap.min.css";
import TaskControls from "./Controls";
import { getCurrentUserId } from "../service/auth";
import undoImg from "../images/undo.png"; 

export default function TaskBoard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userID, setUserID] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showUndoButton, setShowUndoButton] = useState(false);
  const [undoCallback, setUndoCallback] = useState(null);
  const [alertClass, setAlertClass] = useState("alert-success");

  const [filterStatus, setFilterStatus] = useState("all");
  const [sortType, setSortType] = useState("date");
  const [searchQuery, setSearchQuery] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const showAlertWithMessage = (
    message,
    showUndo,
    onUndo,
    variant = "success",
    duration = 5000
  ) => {
    setAlertMessage(message);
    setShowUndoButton(showUndo);
    setUndoCallback(() => onUndo);
    setAlertClass(`alert-${variant}`);

    setShowAlert(true);
    setAlertVisible(true);

    setTimeout(() => {
      setAlertVisible(false);
      setTimeout(() => {
        setShowAlert(false);
        setShowUndoButton(false);
        setUndoCallback(null);
      }, 500);
    }, duration);
  };

  useEffect(() => {
    const fetchUserIDAndTasks = async () => {
      try {
        const currentUserID = await getCurrentUserId();
        setUserID(currentUserID);
        fetchTasks(currentUserID);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };
    fetchUserIDAndTasks();
  }, []);

  useEffect(() => {
    if (location.state?.newTaskAdded) {
      navigate(location.pathname, { replace: true, state: {} });

      const newTaskTitle = location.state?.newTaskTitle;
      showAlertWithMessage(
        newTaskTitle
          ? `Success! A new task "${newTaskTitle}" has been created.`
          : "Success! A new task has been created.",
        false,
        null,
        "success",
        5000
      );
    }
  }, [location, navigate]);

  const fetchTasks = async (userID) => {
    setLoading(true);
    try {
      const fetchedTasks = await getTasks();
      const userTasks = fetchedTasks.filter(task => task.userId === userID);
      setTasks(userTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleMarkAsDone = async (taskId) => {
    try {
      const taskToMark = tasks.find(task => task.id === taskId);
      if (!taskToMark || taskToMark.userId !== userID) return;

      await updateTask(taskId, { status: "Done" });
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId ? { ...task, status: "Done" } : task
        )
      );

      showAlertWithMessage(
        `The task "${taskToMark.title}" was marked as Done successfully!`,
        false,
        null,
        "primary",
        5000
      );
    } catch (error) {
      console.error("Error marking task as done:", error);
    }
  };

  const handleArchiveTask = async (taskId) => {
    try {
      const taskToArchive = tasks.find(task => task.id === taskId);
      if (!taskToArchive || taskToArchive.userId !== userID) return;

      const oldStatus = taskToArchive.status;

      await updateTask(taskId, { status: "archived" });
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId ? { ...task, status: "archived" } : task
        )
      );

      showAlertWithMessage(
        `The task "${taskToArchive.title}" was moved to the archive.`,
        true,
        async () => {
          await updateTask(taskId, { status: oldStatus });
          setTasks(prevTasks =>
            prevTasks.map(task =>
              task.id === taskId ? { ...task, status: oldStatus } : task
            )
          );
        },
        "secondary",
        8000
      );
    } catch (error) {
      console.error("Error archiving task:", error);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filterStatus === "open")
      return task.status !== "Done" && task.status !== "archived";
    if (filterStatus === "done")
      return task.status === "Done" && task.status !== "archived";
    if (filterStatus === "archived")
      return task.status === "archived";
    return task.status !== "archived";
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (a.status === "Done" || a.status === "archived") return 1;
    if (b.status === "Done" || b.status === "archived") return -1;

    if (sortType === "date") {
      const dateA = a.dueDate ? new Date(a.dueDate) : new Date("9999-12-31");
      const dateB = b.dueDate ? new Date(b.dueDate) : new Date("9999-12-31");
      return dateA - dateB;
    }

    if (sortType === "priority") {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      return (priorityOrder[a.priority] || 4) - (priorityOrder[b.priority] || 4);
    }

    return 0; 
  });

  const filteredAndSearchedTasks = sortedTasks.filter(
    task =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <div className="row align-items-center mb-3">
        <div className="col-12 col-md-auto text-center text-md-center">
          <h1 className="my-4">Task Board</h1>
        </div>
  
        <div className="col-12 col-md-auto ms-md-auto">
          {!loading && tasks.filter(task => task.status !== "archived").length > 0 && (
            <TaskControls
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              sortType={sortType}
              setSortType={setSortType}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
            />
          )}
        </div>
      </div>
  
      {loading && <p className="alert">Loading...</p>}
  
      {!loading && filteredAndSearchedTasks.length === 0 && (
        <div className="alert" role="alert">
          {filterStatus === "done" || filterStatus === "archived" ? (
            <strong>No tasks found.</strong>
          ) : (
            <>
              <strong>No tasks found.</strong> Click{" "}
              <em className="text-primary">Create Task</em> above to get started!
            </>
          )}
        </div>
      )}
  
      <div className="row g-3">
        {filteredAndSearchedTasks.map(task => (
          <div key={task.id} className="col-md-4 col-lg-4">
            <TaskItem
              task={task}
              onDelete={handleDeleteTask}
              onDone={handleMarkAsDone}
              onArchive={handleArchiveTask}
            />
          </div>
        ))}
      </div>
  
      {/* התראה/Alert */}
      {showAlert && (
        <div
          className={`
            alert 
            ${alertClass} 
            position-fixed 
            bottom-0 
            start-50 
            translate-middle-x 
            ${alertVisible ? "fade-in" : "fade-out"} 
            alert-overlay
          `}
          style={{ width: "80%", textAlign: "center" }}
        >
          <div className="position-relative d-flex justify-content-center align-items-center">
            {showUndoButton && (
              <img
                src={undoImg}
                alt="undo"
                style={{
                  width: "25px",
                  cursor: "pointer",
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)"
                }}
                onClick={() => {
                  if (undoCallback) {
                    undoCallback();
                  }
                  setAlertVisible(false);
                  setShowAlert(false);
                }}
              />
            )}
            <strong>{alertMessage}</strong>
          </div>
        </div>
      )}
    </div>
  );
  
}
