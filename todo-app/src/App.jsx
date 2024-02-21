import Todo from "./component/Todo";
function App() {
  return (
    <center
      className="todo-container lg border-black border m-4"
      style={{ backgroundColor: "gray" }}
    >
      <h1>Todo App</h1>
      <div className="flex flex-row justify-around">
        <Todo />
      </div>
    </center>
  );
}
export default App;
