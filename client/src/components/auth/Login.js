import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"
import { loginUser, isAuth } from "../../redux/actions/authActions"

import { makeStyles } from "@material-ui/core/styles"
import { Container, TextField, Typography, Button } from "@material-ui/core"

const useStyles = makeStyles(() => ({
  head: {
    color: "#bdbdbd",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1.5rem",
  },
  but: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
  },
  btn: {
    background: "linear-gradient(45deg, #5a48a7 30%, #40c4ff 90%)",
  },
}))

export const Login = (props) => {
  const classes = useStyles()
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  })

  useEffect(() => {
    props.isAuth()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push("/")
    }
  }, [props])

  const handleChange = (event) => {
    setFormValue({ ...formValue, [event.target.name]: event.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email: formValue.email,
      password: formValue.password,
    }

    props.loginUser(userData)
  }
  return (
    <header className="auth-screen">
      <Container maxWidth="sm" style={{ marginTop: "8vh" }}>
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <Typography variant="h4" className={classes.head}>
            Log In
          </Typography>
          <TextField
            required
            margin="dense"
            name="email"
            value={formValue.email}
            onChange={handleChange}
            label="Email Address"
            type="email"
            variant="outlined"
            fullWidth
          />
          {props.errors.emailLogin ? (
            <Typography variant="caption" color="secondary">
              {props.errors.emailLogin}
            </Typography>
          ) : (
            ""
          )}
          <TextField
            required
            margin="dense"
            label="Password"
            type="password"
            name="password"
            value={formValue.password}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
          {props.errors.passwordLogin ? (
            <Typography variant="caption" color="secondary">
              {props.errors.passwordLogin}
            </Typography>
          ) : (
            ""
          )}
          <div className={classes.but}>
            <Button type="submit" variant="contained" className={classes.btn}>
              Log In
            </Button>
          </div>
        </form>
        <Typography variant="subtitle1" className={classes.head}>
          Didn't have an account? &nbsp;
          <Link to="/register"> Sign Up here </Link>
        </Typography>
      </Container>
    </header>
  )
}

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  isAuth: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({ auth: state.auth, errors: state.errors })

const mapDispatchToProps = { loginUser, isAuth }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))
