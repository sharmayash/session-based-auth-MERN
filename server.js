const cors = require("cors")
const path = require("path")
const express = require("express")
const mongoose = require("mongoose")
const session = require("express-session")
const MongoDBStore = require("connect-mongodb-session")(session)

const app = express()

// Constants
const { mongoURI, secretOrKey } = require("./config/keys")
const MAX_AGE = 1000 * 60 * 60 * 3 // Three hours

// Connecting to Database

mongoose
  .connect(mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err))

// setting up connect-mongodb-session store
const mongoDBstore = new MongoDBStore({
  uri: mongoURI,
  collection: "mySessions",
})

// Express Bodyparser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Express-Session
app.use(
  session({
    name: "name",
    secret: secretOrKey,
    resave: true,
    saveUninitialized: false,
    store: mongoDBstore,
    cookie: {
      maxAge: MAX_AGE,
      sameSite: false,
      secure: false,
    },
  })
)

app.use(cors())

app.use("/api/users", require("./routes/users"))

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}

app.listen(process.env.PORT || 4000, () => console.log(`Server started`))
