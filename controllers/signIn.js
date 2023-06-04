const handleSignIn = (db, bcrypt) => (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("Incorrect login format!");
  }

  db.select("*")
    .from("login")
    .where({ email: email })
    .then((user) => {
      //   res.send(user);
      const isValidPassword = bcrypt.compareSync(password, user[0].hash);
      if (isValidPassword) {
        // res.json("LogIn Success");
        return db("users")
          .select("*")
          .where({ email: email })
          .then((user) => {
            res.json(user);
          })
          .catch((err) =>
            res.status(400).json("Unable to find retrieve user!")
          );
      } else {
        res.json("Wrong password!");
      }
    })
    .catch((err) => res.status(400).json("Can't find user!"));

  //   if (
  //     req.body.email === database.users[1].email &&
  //     req.body.password === database.users[1].password
  //   ) {
  //     res.json("Success");
  //   } else {
  //     res.status(400).json("error logging in");
  //   }
  //   res.send(express.json(req.body));
};

module.exports = { handleSignIn: handleSignIn };
