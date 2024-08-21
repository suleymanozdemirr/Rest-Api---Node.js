const Auth = require("../models/auth.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await Auth.findOne({ email });

    if (user) {
      return res
        .status(500)
        .json({ message: "Bu email hesabı zaten bulunmakta !!! " });
    }

    if (password.lenght < 6) {
      return res.status(500).json({
        message: "Şifre en az 6 karakter olmalıdır !!!",
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = new Auth.create({
      username,
      email,
      password: passwordHash,
    });

    const userToken = jwt.sign({ id: newUser.id }, process.env.SECRET_TOKEN, {
      expiresIn: "1h",
    });

    res.status(200).json({ status: "OK", user: newUser, token: userToken });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
