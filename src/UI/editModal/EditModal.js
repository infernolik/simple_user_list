import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { LinearProgress } from "@mui/material";
import { loadCurrentUser, updateUser } from "../../actions/userActions.js";

export default function EditModal() {
  const params = useParams();
  const dispatch = useDispatch();
  // Edit enabler
  const [edit, setEdit] = useState(false);
  const [contact, setContact] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    street: "",
    city: "",
    zipcode: "",
    comment: "",
  });

  const userContext = useSelector((state) => state.users);
  const { currentUser, loading } = userContext;

  const handleChange = (ev) => {
    setContact({
      ...contact,
      [ev.target.name]: ev.target.value,
    });
  };

  const handleClick = () => {
    setEdit(true);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (edit) {
      if (
        !name.trim() ||
        !username.trim() ||
        !email.trim() ||
        !phone.trim() ||
        !website.trim() ||
        !street.trim() ||
        !city.trim() ||
        !zipcode.trim()
      ) {
        for (let field in contact) {
          if (field === "comment") continue;
          if (!contact[field].trim()) {
            document
              .getElementById(`${field}`)
              .parentElement.classList.add("warning");
          } else {
            document
              .getElementById(`${field}`)
              .parentElement.classList.remove("warning");
          }
        }
      } else {
        // Условная отправка данных формы (вывод в консоль)
        console.log(JSON.stringify(contact));
        document
          .querySelectorAll(".form-field")
          .forEach((div) => div.classList.remove("warning"));
        // Реальная отправка данных на сервер. Правда JSON placeholder их не обновит и ничего не вернёт
        // dispatch(updateUser(contact, params.id));
      }
    }
  };

  useEffect(() => {
    dispatch(loadCurrentUser(params.id));
  }, []);

  useEffect(() => {
    if (currentUser !== null) {
      setContact({
        ...contact,
        name: currentUser.name,
        username: currentUser.username,
        email: currentUser.email,
        phone: currentUser.phone,
        website: currentUser.website,
        street: currentUser.address.street,
        city: currentUser.address.city,
        zipcode: currentUser.address.zipcode,
      });
    }
  }, [currentUser]);

  const {
    name,
    username,
    email,
    phone,
    website,
    street,
    city,
    zipcode,
    comment,
  } = contact;

  return (
    <div className="userProfile userContainer">
      <h2>Профиль пользователя</h2>
      {loading ? null : (
        <span id="edit" className="btn" onClick={handleClick}>
          Редактировать
        </span>
      )}
      {loading ? (
        <Box sx={{ marginTop: "2rem" }}>
          <LinearProgress color="success" />
        </Box>
      ) : (
        <section>
          <div id="edit-form">
            <form id="user-form" onSubmit={handleSubmit}>
              <div className="form-field">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Иван Иванов"
                  onChange={handleChange}
                  value={name}
                  readOnly={!edit}
                />
              </div>
              <div className="form-field">
                <label htmlFor="">User name</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Ivan"
                  onChange={handleChange}
                  value={username}
                  readOnly={!edit}
                />
              </div>
              <div className="form-field">
                <label htmlFor="">E-mail</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="example@mail.com"
                  onChange={handleChange}
                  value={email}
                  readOnly={!edit}
                />
              </div>
              <div className="form-field">
                <label htmlFor="">Street</label>
                <input
                  type="text"
                  name="street"
                  id="street"
                  placeholder="ул. Пример"
                  onChange={handleChange}
                  value={street}
                  readOnly={!edit}
                />
              </div>
              <div className="form-field">
                <label htmlFor="">City</label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  placeholder="Москва"
                  onChange={handleChange}
                  value={city}
                  readOnly={!edit}
                />
              </div>
              <div className="form-field">
                <label htmlFor="">Zip code</label>
                <input
                  type="text"
                  name="zipcode"
                  id="zipcode"
                  placeholder="1234234"
                  onChange={handleChange}
                  value={zipcode}
                  readOnly={!edit}
                />
              </div>
              <div className="form-field">
                <label htmlFor="">Phone</label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="89991112233"
                  onChange={handleChange}
                  value={phone}
                  readOnly={!edit}
                />
              </div>
              <div className="form-field">
                <label htmlFor="">Website</label>
                <input
                  type="text"
                  name="website"
                  id="website"
                  placeholder="www.example.com"
                  onChange={handleChange}
                  value={website}
                  readOnly={!edit}
                />
              </div>
              <div className="form-field" id="comment-field">
                <label htmlFor="comment">Comment</label>
                <textarea
                  name="comment"
                  id="comment"
                  onChange={handleChange}
                  value={comment}
                  readOnly={!edit}
                ></textarea>
              </div>
            </form>
          </div>
          <button
            form="user-form"
            className={`btn ${edit ? "enabled" : "disabled"}`}
          >
            Отправить
          </button>
        </section>
      )}
    </div>
  );
}
