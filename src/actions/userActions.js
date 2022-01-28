import axios from "axios";
import {
  LOAD_USERS,
  LOAD_CURRENT_USER,
  UPDATE_USER,
  // SET_FILTER_NAME,
  // SET_FILTER_CITY,
  CLEAR_FILTERS,
  SET_ERROR,
  SET_LOADING,
} from "../reducers/types";

const url = "https://jsonplaceholder.typicode.com";

export const loadUsers = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoading());
      const response = await axios.get(`${url}/users`);
      dispatch({ type: LOAD_USERS, payload: response.data });
    } catch (err) {
      // Условная ошибка от JSON placeholder
      dispatch({ type: SET_ERROR, payload: err.response.data });
    }
  };
};

export const loadCurrentUser = (id) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading());
      const response = await axios.get(`${url}/users/${id}`);
      dispatch({ type: LOAD_CURRENT_USER, payload: response.data });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data });
    }
  };
};

export const setFilter = (filter) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading());
      dispatch({ type: `SET_FILTER_${filter}` });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data });
    }
  };
};

export const clearFilters = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_FILTERS });
  };
};

// Метод для апдейта, если бы JSON placeholder действительно обновлял дату
// export const updateUser = (user, id) => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.put(`${url}/users/${id}`, user);
//       dispatch({ type: UPDATE_USER, payload: response.data });
//     } catch (err) {
//       dispatch({ type: SET_ERROR, payload: err.response.data });
//     }
//   };
// };

// Side operations
const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
