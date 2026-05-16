import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {

  const [tasks, setTasks] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
  });

  // Fetch All Tasks
  const fetchTasks = async () => {
    try {

      const response = await API.get("/tasks");

      setTasks(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  // Load Tasks Automatically
  useEffect(() => {
    fetchTasks();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // Create Task
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await API.post("/tasks", formData);

      alert("Task created successfully");

      setFormData({
        title: "",
        description: "",
        priority: "medium",
      });

      fetchTasks();

    } catch (error) {

      alert("Failed to create task");

    }
  };

  // Delete Task
  const handleDelete = async (id) => {

    try {

      await API.delete(`/tasks/${id}`);

      alert("Task deleted successfully");

      fetchTasks();

    } catch (error) {

      alert("Failed to delete task");

    }
  };

  return (
    <div style={{ padding: "20px" }}>

      <h1>Task Dashboard</h1>

      {/* Task Form */}
      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={formData.title}
          onChange={handleChange}
        />

        <br /><br />

        <textarea
          name="description"
          placeholder="Task Description"
          value={formData.description}
          onChange={handleChange}
        />

        <br /><br />

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <br /><br />

        <button type="submit">
          Add Task
        </button>

      </form>

      <hr />

      {/* Task List */}
      <h2>All Tasks</h2>

      {
        tasks.length === 0 ? (
          <p>No tasks available</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              style={{
                border: "1px solid black",
                padding: "10px",
                marginBottom: "10px",
              }}
            >

              <h3>{task.title}</h3>

              <p>{task.description}</p>

              <p>
                Priority: {task.priority}
              </p>

              <p>
                Status: {task.status}
              </p>

              <button
                onClick={() => handleDelete(task.id)}
              >
                Delete Task
              </button>

            </div>
          ))
        )
      }

    </div>
  );
}

export default Dashboard;