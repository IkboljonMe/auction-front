import "./base/styles/App.css";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import AppRoutes from "./AppRoutes";

// Set the base URL for all axios requests
axios.defaults.baseURL =
  process.env.REACT_APP_API_PROXY || "http://localhost:5000";

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
