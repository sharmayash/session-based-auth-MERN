const bcrypt = require("bcryptjs")
const User = require("../models/User") // User model

exports.registerUser = (req, res) => {
  const { name, email, password, role } = req.body

  User.findOne({ email: email }).then((user) => {
    if (user) return res.status(400).json("User already exists")
    let newUser

    if (role === "admin") {
      //New User created
      newUser = new User({
        name,
        email,
        password,
        role,
        permissions: ["AccessGreenButton", "AccessRedButton"],
      })
    } else {
      newUser = new User({
        name,
        email,
        password,
        role,
        permissions: ["AccessGreenButton"],
      })
    }

    //Password hashing
    bcrypt.genSalt(12, (err, salt) =>
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err

        newUser.password = hash

        // Save user
        newUser
          .save()
          .then((user) => res.json(user))
          .catch((err) => console.log(err))
      })
    )
  })
}

exports.loginUser = (req, res) => {
  const { email, password } = req.body

  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json("Incorrect Email or Password")

    // Validate password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json("Incorrect Email or Password")

      const sessUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        permissions: user.permissions,
      }
      req.session.user = sessUser // Auto saves session data in mongo store

      res.json(sessUser) // sends cookie with sessionID automatically in response
    })
  })
}

exports.logoutUser = (req, res) => {
  req.session.destroy((err) => {
    // delete session data from store, using sessionID in cookie
    if (err) throw err
    res.clearCookie("session-id") // clears cookie containing expired sessionID
    res.send("Logged out successfully")
  })
}

exports.authChecker = (req, res) => {
  const sessUser = req.session.user
  if (sessUser) {
    return res.json(sessUser)
  } else {
    return res.status(401).json({ msg: "Unauthorized" })
  }
}
