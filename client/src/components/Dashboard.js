import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { isAuth, logOutUser } from "../redux/actions/authActions"

import { makeStyles } from "@material-ui/core/styles"
import { Button, Grid, Typography, Container } from "@material-ui/core"

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
    padding: "1.5rem",
  },
  btn: {
    padding: "10px",
    background: "linear-gradient(45deg, #5a78a7 30%, #40c4ff 90%)",
  },
}))

function Dashboard({ auth, logOutUser, isAuth }) {
  const classes = useStyles()

  // destructure data from prop
  const { isAuthenticated, user } = auth

  useEffect(() => {
    isAuth()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (!isAuthenticated) {
      console.log("Login Plese")
    }
  }, [isAuthenticated])

  const handleLogOut = (e) => {
    e.preventDefault()
    logOutUser()
  }

  return isAuthenticated ? (
    <>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <Grid item>
          <h1>Session based Auth.</h1>
        </Grid>
        <Grid item>
          <Button size="small" className={classes.btn} onClick={handleLogOut}>
            Log Out
          </Button>
        </Grid>
      </Grid>
      <Container maxWidth="sm">
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h4" className={classes.head}>
              Permissions available :-
            </Typography>
          </Grid>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
          >
            {user.permissions.map((permission) =>
              permission === "AccessGreenButton" ? (
                <Grid item>
                  <Button
                    style={{ backgroundColor: "#0ecc15" }}
                    variant="contained"
                  >
                    Green
                  </Button>
                </Grid>
              ) : (
                <Grid item>
                  <Button
                    style={{ backgroundColor: "#eb3434" }}
                    variant="contained"
                  >
                    Red
                  </Button>
                </Grid>
              )
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  ) : (
    <Redirect to="/login" />
  )
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  isAuth: PropTypes.func.isRequired,
  logOutUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  urls: state.urls,
})

export default connect(mapStateToProps, { logOutUser, isAuth })(Dashboard)
