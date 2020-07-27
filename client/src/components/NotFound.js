import React from "react"

export default function NotFound() {
  return (
    <header className="auth-screen">
      <h1>404</h1>
      <br />
      <br />
      <span style={{ display: "flex", justifyContent: "center" }}>
        Page not found for {window.location.href}
      </span>
    </header>
  )
}
