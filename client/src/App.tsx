import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Login from "./components/Login";
import TaskList from "./components/task-list/TaskList";
import "./App.css";

export default function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}
