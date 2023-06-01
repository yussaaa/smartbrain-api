const express = require("express");

const app = express();

const database = {
  users: [
    {
      id: "123",
      name: "Sally",
      email: "sally@gmail.com",
      password: "bananas",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "John",
      email: "john@gmail.com",
      password: "apples",
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
  database.users.push({
    id: "125",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });
  res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;

  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  res.status(400).json("Not Found!");
});

app.post("/image", (req, res) => {
  const { id } = req.body;
  let found = false;

  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  res.status(400).json("Not Found!");
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
