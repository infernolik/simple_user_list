import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/material";
import { LinearProgress } from "@mui/material";
import UserItem from "./UserItem.js";
import { loadUsers } from "../../actions/userActions.js";

export default function UserList() {
  const dispatch = useDispatch();
  const userContext = useSelector((state) => state.users);
  const { users, loading, filtered } = userContext;

  useEffect(() => {
    dispatch(loadUsers());
  }, []);
  return (
    <div className="userList userContainer">
      <h2>Список пользователей</h2>
      {loading ? (
        <Box sx={{ marginTop: "2rem" }}>
          <LinearProgress color="success" />
        </Box>
      ) : (
        <section>
          {!users ? (
            <p style={styles}>Список пользователей пуст!</p>
          ) : (
            (filtered ? filtered : users).map((user) => {
              return <UserItem key={user.id} userData={user} />;
            })
          )}
          {!users ? null : (
            <p id="counter" style={{ float: "right" }}>
              Найдено {users.length} пользователей
            </p>
          )}
        </section>
      )}
    </div>
  );
}

const styles = {
  fontSize: "1.1rem",
};
