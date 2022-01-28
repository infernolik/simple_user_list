import React from "react";
import { Link } from "react-router-dom";

export default function UserItem({ userData }) {
  const {
    id,
    name,
    address: { city },
    company: { name: companyName },
  } = userData;
  return (
    <div className="userItem">
      <div className="personal-info">
        <p className="data-field">
          <span>ФИО</span>:  {name}
        </p>
        <p className="data-field">
          <span>город</span>:  {city}
        </p>
        <p className="data-field">
          <span>компания</span>:  {companyName}
        </p>
      </div>
      <Link to={`/users/${id}`} className="more">
        Подробнее
      </Link>
    </div>
  );
}
