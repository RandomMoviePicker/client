import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProviderWrapper } from "./context/auth.context";
import Navbar from "./components/Navbar/Navbar";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  
  <Router>
    <AuthProviderWrapper>
      <App />
    </AuthProviderWrapper>
  </Router>
);
