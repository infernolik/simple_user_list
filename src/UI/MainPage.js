import React from "react";
import FilterPanel from "./FilterPanel.js";
import UserList from "./users/UserList.js";

export default function MainPage() {
  return (
    <div className="main">
      <FilterPanel />
      <UserList />
    </div>
  );
}
