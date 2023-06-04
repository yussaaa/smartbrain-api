const handleImage = (req, res, db) => {
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
};

module.exports = { handleImage };
