import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store.js";
// Components
import FilterPanel from "./UI/FilterPanel.js";
import UserList from "./UI/users/UserList.js";
import EditModal from "./UI/editModal/EditModal.js";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="main">
          <FilterPanel />
          <Routes>
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<EditModal />} />
            <Route path="*" element={<Navigate to={"/users"} />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
