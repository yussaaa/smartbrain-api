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

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json(database.users);
});

app.post("/signin", (req, res) => {
  if (
    req.body.email === database.users[1].email &&
    req.body.password === database.users[1].password
  ) {
    res.json("Success");
  } else {
    res.status(400).json("error logging in");
  }
  //   res.send(express.json(req.body));
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;

  db("users")
    .returning("*")
    .insert({
      name: name,
      email: email,
      joined: new Date(),
    })
    .then((resposne) => {
      res.json(resposne);
    })
    .catch((err) => res.status(400).json("Unable to register")); //printing out err here will reveal the user into in the response, should replace with a simple error message
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;

  db.select("*")
    .where({ id: id })
    .from("users")
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json("User not found!");
      }
    })
    .catch((err) => res.status(400).json("Error getting user"));
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  let found = false;

  //   database.users.forEach((user) => {
  //     if (user.id === id) {
  //       found = true;
  //       user.entries++;
  //       return res.json(user.entries);
  //     }
  //   });
  db.where({ id: id })
    .increment({ entries: 1 })
    .returning("entries")
    .from("users")
    .then((entries) => res.json(entries[0].entries))
    .catch((err) => res.status(400).json("Error getting user entries."));
  //   res.status(400).json("Not Found!");
});

const port_num = 3006;

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
