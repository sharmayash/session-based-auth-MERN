import React from "react"
import { Provider } from "react-redux"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import "./App.css"

// Importing app files

import store from "./redux/store"

// Importing Custom Components

import Dashboard from "./components/Dashboard"
import NotFound from "./components/NotFound"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="" component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App
