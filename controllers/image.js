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

const handleAPIcall = async (req, res) => {
  const USER_ID = "yussaaa";
  // Your PAT (Personal Access Token) can be found in the portal under Authentification
  const PAT = "745dac730f244d019776b20b145e1544";
  const APP_ID = "my-first-application";
  // Change these to whatever model and image URL you want to use
  const MODEL_ID = "face-detection";
  const MODEL_VERSION_ID = "6dc7e46bc9124c5c8824be4822abe105";

  const clarifaiReturnRequestOption = (img_url) => {
    ///////////////////////////////////////////////////////////////////////////////////
    // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
    ///////////////////////////////////////////////////////////////////////////////////

    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: img_url,
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + PAT,
      },
      body: raw,
    };

    return requestOptions;
  };

  const response = await fetch(
    "https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs",
    clarifaiReturnRequestOption(req.body.url)
  );
  const data = await response.json();

  res.json(data);
};

module.exports = { handleImage, handleAPIcall };
