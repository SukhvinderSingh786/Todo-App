import React, { useState, useEffect } from "react";
import { MdEdit, MdDelete, MdUpdate, MdCancel } from "react-icons/md";

function Todo() {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [filterOption, setFilterOption] = useState("All");
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setList(storedTodos);
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) return;
    const newItem = {
      text: input,
      id: Date.now(),
      completed: false,
    };
    const updatedTodos = [...list, newItem];
    setList(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setInput("");
  };
  const removeItem = (id) => {
    const filteredList = list.filter((item) => item.id !== id);
    setList(filteredList);
    localStorage.setItem("todos", JSON.stringify(filteredList));
  };
  const editItem = (id) => {
    setIsEditing(true);
    setEditId(id);
    const itemToEdit = list.find((item) => item.id === id);
    setInput(itemToEdit.text);
  };
  const updateItem = () => {
    const updatedTodos = list.map((item) =>
      item.id === editId ? { ...item, text: input } : item
    );
    setList(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setIsEditing(false);
    setInput("");
    setEditId(null);
  };
  const handleComplete = (id) => {
    const updatedTodos = list.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setList(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };
  const editing = () => {
    setIsEditing(false);
    setInput();
  };
  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
  };

  const filteredList = list.filter((item) => {
    if (filterOption === "active") {
      return !item.completed;
    } else if (filterOption === "completed") {
      return item.completed;
    } else {
      return true;
    }
  });

  return (
    <div className="col-md-8">
      <div className="card mt-4">
        <div className="card-header bg-primary text-white">
          <select value={filterOption} onChange={handleFilterChange}>
            {/* {" "} */}
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
          {!isEditing ? (
            <form onSubmit={handleSubmit}>
              <input
                className="form-control mb-4"
                type="text"
                value={input}
                placeholder="Enter your task"
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="submit" className="btn btn-warning mb-3">
                Add
              </button>
            </form>
          ) : (
            <form onSubmit={updateItem}>
              <input
                className="form-control mb-2"
                type="text"
                name="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="submit" className="btn btn-primary mb-2 me-2">
                <MdUpdate /> Update
              </button>
              <button
                onClick={() => editing}
                className="btn btn-secondary mb-2"
              >
                <MdCancel /> Cancel
              </button>
            </form>
          )}
          {filteredList.length > 0 ? (
            <ul className="list-group ">
              {filteredList.map((item) => (
                <li
                  key={item.id}
                  className={`list-group-item m-1 font-bold ${
                    item.completed ? "text-decoration-line-through" : ""
                  }`}
                >
                  <span className=" m-5 ">{item.text}</span>
                  <button
                    className={`btn ${
                      item.completed ? "btn-outline-secondary" : "btn-success"
                    } ms-2`}
                    onClick={() => handleComplete(item.id)}
                  >
                    {item.completed ? "Completed Already" : "Active"}
                  </button>
                  <button
                    className="btn btn-primary ms-2"
                    onClick={() => editItem(item.id)}
                  >
                    <MdEdit />
                  </button>
                  <button
                    className="btn btn-danger ms-2"
                    onClick={() => removeItem(item.id)}
                  >
                    <MdDelete />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ fontFamily: "cursive" }}>No tasks to do</p>
          )}
        </div>
      </div>
      {/* <button onClick={post}>Post</button> */}
    </div>
  );
}

export default Todo;
