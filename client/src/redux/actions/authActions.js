import axios from "axios"
import { GET_ERRORS, SET_CURRENT_USER } from "./types"

// Check if session cookie is stored

export const isAuth = () => (dispatch) => {
  axios
    .get("/api/users/authchecker")
    .then((res) => {
      //set current user
      dispatch(setCurrentUser(res.data))
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    })
}

// register user

export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/api/users/register", userData)
    .then((res) => {
      dispatch(setCurrentUser(res.data))
      history.push("/login")
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    )
}

// login user

export const loginUser = (userData) => (dispatch) => {
  axios
    .post("/api/users/login", userData)
    .then((res) => {
      //set current user
      dispatch(setCurrentUser(res.data))
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    })
}

// logout user

export const logOutUser = () => (dispatch) => {
  axios
    .delete("/api/users/logout")
    .then((res) => {
      console.log(res.data)
      //set current user to empty object {} which will set isAuthenticated to false
      dispatch(setCurrentUser({}))
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    })
}

export const setCurrentUser = (userData) => {
  return {
    type: SET_CURRENT_USER,
    payload: userData,
  }
}
