import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"
import { registerUser, isAuth } from "../../redux/actions/authActions"

import { makeStyles } from "@material-ui/core/styles"
import {
  Container,
  TextField,
  Typography,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core"

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

function Register(props) {
  const classes = useStyles()
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    role: "",
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
    setState({ ...state, [event.target.name]: event.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newUser = {
      name: state.name,
      email: state.email,
      password: state.password,
      password2: state.password2,
      role: state.role,
    }

    props.registerUser(newUser, props.history)
  }

  return (
    <header className="auth-screen">
      <Container maxWidth="sm" style={{ marginTop: "8vh" }}>
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <Typography variant="h4" className={classes.head}>
            Sign Up
          </Typography>
          <TextField
            required
            margin="dense"
            name="name"
            value={state.name}
            onChange={handleChange}
            label="Full Name"
            type="text"
            variant="outlined"
            fullWidth
          />
          {props.errors.name ? (
            <Typography variant="caption" color="secondary">
              {props.errors.name}
            </Typography>
          ) : (
            ""
          )}
          <TextField
            required
            margin="dense"
            name="email"
            value={state.email}
            onChange={handleChange}
            label="Email Address"
            type="email"
            variant="outlined"
            fullWidth
          />
          {props.errors.email ? (
            <Typography variant="caption" color="secondary">
              {props.errors.email}
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
            value={state.password}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
          {props.errors.password ? (
            <Typography variant="caption" color="secondary">
              {props.errors.password}
            </Typography>
          ) : (
            ""
          )}
          <TextField
            required
            margin="dense"
            label="Confirm Password"
            type="password"
            name="password2"
            value={state.password2}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
          {props.errors.password2 ? (
            <Typography variant="caption" color="secondary">
              {props.errors.password2}
            </Typography>
          ) : (
            ""
          )}
          <FormControl variant="outlined" required fullWidth>
            <InputLabel htmlFor="role-simple">User Role</InputLabel>
            <Select
              required
              value={state.role}
              onChange={handleChange}
              inputProps={{
                name: "role",
                id: "role-simple",
              }}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="customer">Customer</MenuItem>
            </Select>
          </FormControl>
          {props.errors.role ? (
            <Typography variant="caption" color="secondary">
              {props.errors.role}
            </Typography>
          ) : (
            ""
          )}
          <div className={classes.but}>
            <Button type="submit" variant="contained" className={classes.btn}>
              Sign up
            </Button>
          </div>
        </form>
        <Typography variant="subtitle1" className={classes.head}>
          Already have an account? &nbsp;
          <Link to="/login"> Log In here </Link>
        </Typography>
      </Container>
    </header>
  )
}

Register.propTypes = {
  isAuth: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
})

export default connect(mapStateToProps, { isAuth, registerUser })(
  withRouter(Register)
)
