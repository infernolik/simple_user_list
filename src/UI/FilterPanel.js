import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, clearFilters } from "../actions/userActions.js";

export default function FilterPanel() {
  const dispatch = useDispatch();
  const [byName, setByName] = useState(false);
  const [byCity, setByCity] = useState(false);
  const users = useSelector((state) => state.users.users);

  const handleClick = (ev) => {
    if (users !== null) {
      if (ev.target.dataset.type === "NAME") {
        setByName(!byName);
        setByCity(false);
      } else if (ev.target.dataset.type === "CITY") {
        setByCity(!byCity);
        setByName(false);
      }
      dispatch(setFilter(ev.target.dataset.type));
    }
  };

  useEffect(() => {
    if (!byName && !byCity) dispatch(clearFilters());
  }, [byName, byCity]);

  return (
    <div className="filter-panel">
      <div className="filter-options">
        <p>Сортировка</p>
        <span
          className={`filters btn ${byCity ? "selected" : ""}`}
          data-type="CITY"
          onClick={handleClick}
        >
          По городу
        </span>
        <span
          className={`filters btn ${byName ? "selected" : ""}`}
          data-type="NAME"
          onClick={handleClick}
        >
          По имени
        </span>
      </div>
    </div>
  );
}
