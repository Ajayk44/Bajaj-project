const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const user_info = {
  user_id: "Ajaykrishnan_K_04042003",
  email: "krishnanajayk@gmail.com",
  roll_number: "21BCE2890",
};

app.post("/bfhl", (req, res) => {
  const { data } = req.body;

  if (!Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      message: "Invalid input data format. Expecting an array.",
    });
  }

  const numbers = [];
  const alphabets = [];
  let highestLowercaseAlphabet = null;

  data.forEach((item) => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else if (/[a-zA-Z]/.test(item)) {
      alphabets.push(item);
      if (
        item === item.toLowerCase() &&
        (highestLowercaseAlphabet === null || item > highestLowercaseAlphabet)
      ) {
        highestLowercaseAlphabet = item;
      }
    }
  });

  res.status(200).json({
    is_success: true,
    user_id: user_info.user_id,
    email: user_info.email,
    roll_number: user_info.roll_number,
    numbers: numbers,
    alphabets: alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet
      ? [highestLowercaseAlphabet]
      : [],
  });
});

app.get("/bfhl", (req, res) => {
  res.status(200).json({
    operation_code: 1,
  });

  res.send({
    operation_code: 2,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
