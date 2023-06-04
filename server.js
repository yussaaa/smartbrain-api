const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const db = require("knex")({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "",
    password: "",
    database: "smart-brain",
  },
});

const register = require("./controllers/register");
const signin = require("./controllers/signIn");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("This is working!");
});

app.post("/signin", signin.handleSignIn(db, bcrypt));

app.post("/register", (req, res) => {
  register.handleRegistr(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfile(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.put("/imageurl", (req, res) => {
  image.handleAPIcall(req, res);
});

const port_num = process.env.PORT || 3006;

app.listen(port_num, () => {
  console.log(`app is running on port ${port_num}`);
});

/* 
API design: 

res: this is working 
/signin -> POST succcess/ fail 
/register -> POST user 
/ profile/:userID -> GET = user 
/image -> PUT -> user

*/
