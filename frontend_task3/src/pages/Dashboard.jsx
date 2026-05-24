import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const COLUMNS = [
  { key: "todo", label: " To Do" },
  { key: "inprogress", label: " In Progress" },
  { key: "done", label: " Done" },
];

function Dashboard() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [editingTask, setEditingTask] = useState(null);
  const [draggedTask, setDraggedTask] = useState(null);

  const getTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { getTasks(); }, []);

  const openModal = (task = null) => {
    if (task) {
      setEditingTask(task);
      setTitle(task.title);
      setDescription(task.description || "");
      setPriority(task.priority || "medium");
    } else {
      setEditingTask(null);
      setTitle("");
      setDescription("");
      setPriority("medium");
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTask(null);
    setTitle(""); setDescription(""); setPriority("medium");
  };

  const saveTask = async () => {
    if (!title.trim()) return alert("Title is required");
    try {
      if (editingTask) {
        await API.put(`/tasks/${editingTask._id}`, { title, description, priority });
      } else {
        await API.post("/tasks", { title, description, priority, status: "todo" });
      }
      closeModal();
      getTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      getTasks();
    } catch (err) { console.log(err); }
  };

  const moveTask = async (task, newStatus) => {
    try {
      await API.put(`/tasks/${task._id}`, {
        ...task,
        status: newStatus,
        completed: newStatus === "done",
      });
      getTasks();
    } catch (err) { console.log(err); }
  };

  const onDragStart = (task) => setDraggedTask(task);

  const onDrop = (status) => {
    if (draggedTask && draggedTask.status !== status) {
      moveTask(draggedTask, status);
    }
    setDraggedTask(null);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const priorityColor = { low: "#4caf50", medium: "#ff9800", high: "#f44336" };

  return (
    <div className="board-wrapper">
  
      <div className="board-header">
        <h1> Project Board</h1>
        <div className="header-actions">
          <button className="create-btn" onClick={() => openModal()}>+ Create Issue</button>
          <button className="logout-btn" onClick={logout}>Logout</button>
        </div>
      </div>

    
      <div className="board-columns">
        {COLUMNS.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.key);
          return (
            <div
              key={col.key}
              className="column"
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => onDrop(col.key)}
            >
              <div className="column-header">
                <span>{col.label}</span>
                <span className="task-count">{colTasks.length}</span>
              </div>
              {colTasks.map((task) => (
                <div
                  key={task._id}
                  className="task-card"
                  draggable
                  onDragStart={() => onDragStart(task)}
                >
                  <div className="task-card-top">
                    <span
                      className="priority-badge"
                      style={{ background: priorityColor[task.priority] }}
                    >
                      {task.priority}
                    </span>
                    <div className="card-actions">
                      <button className="icon-btn" onClick={() => openModal(task)}>✏️</button>
                      <button className="icon-btn delete" onClick={() => deleteTask(task._id)}>🗑️</button>
                    </div>
                  </div>
                  <h3 className="task-title">{task.title}</h3>
                  {task.description && <p className="task-desc">{task.description}</p>}
                  <div className="task-footer">
                    <small>{new Date(task.createdAt).toLocaleDateString()}</small>
                    <div className="move-btns">
                      {col.key !== "todo" && (
                        <button className="move-btn" onClick={() => moveTask(task, col.key === "inprogress" ? "todo" : "inprogress")}>◀</button>
                      )}
                      {col.key !== "done" && (
                        <button className="move-btn" onClick={() => moveTask(task, col.key === "todo" ? "inprogress" : "done")}>▶</button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>


      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editingTask ? "Edit Issue" : "Create Issue"}</h2>
            <input
              type="text"
              placeholder="Issue title *"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="low">🟢 Low Priority</option>
              <option value="medium">🟠 Medium Priority</option>
              <option value="high">🔴 High Priority</option>
            </select>
            <div className="modal-actions">
              <button onClick={closeModal} className="cancel-btn">Cancel</button>
              <button onClick={saveTask} className="save-btn">
                {editingTask ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;