import {
  LOAD_USERS,
  LOAD_CURRENT_USER,
  UPDATE_USER,
  SET_FILTER_NAME,
  SET_FILTER_CITY,
  CLEAR_FILTERS,
  SET_ERROR,
  SET_LOADING,
} from "./types";

const initialState = {
  users: null,
  currentUser: null,
  filtered: null,
  errors: null,
  loading: false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USERS:
      return {
        ...state,
        errors: null,
        loading: false,
        users: action.payload,
      };

    case LOAD_CURRENT_USER:
      return {
        ...state,
        errors: null,
        loading: false,
        currentUser: action.payload,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    case SET_ERROR:
      return {
        ...state,
        errors: action.payload,
      };

    case SET_FILTER_NAME:
      return {
        ...state,
        loading: false,
        errors: null,
        filtered: [...state.users].sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
          if (a.name.toLowerCase() === b.name.toLowerCase()) return 0;
          if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        }),
      };

    case SET_FILTER_CITY:
      return {
        ...state,
        loading: false,
        errors: null,
        filtered: [...state.users].sort((a, b) => {
          if (a.address.city.toLowerCase() > b.address.city.toLowerCase())
            return 1;
          if (a.address.city.toLowerCase() === b.address.city.toLowerCase())
            return 0;
          if (a.address.city.toLowerCase() < b.address.city.toLowerCase())
            return -1;
        }),
      };

    case CLEAR_FILTERS:
      return {
        ...state,
        loading: false,
        errors: null,
        filtered: null,
      };
    // Метод для апдейта, если бы JSON placeholder действительно апдейтил и возвращал изменённый айтем
    // case UPDATE_USER:
    //   return {
    //     ...state,
    //     errors: null,
    //     users: state.users.map(user => {
    //       return user.id === action.payload.id ? action.payload : user;
    //     })
    //   };

    default:
      return state;
  }
}
