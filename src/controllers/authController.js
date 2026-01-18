const { prisma } = require("../config/db");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/generateToken");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  //   check if user already exists
  const userExist = await prisma.user.findUnique({
    where: { email: email },
  });

  if (userExist) {
    return res.status(400).json({
      error: "User already exist with this email",
    });
  }

  // generate a token
  // const token = generateToken(userExist.id, res);

  //   hash password
  const salt = await bcrypt.genSalt(10);
  const hassedPassword = await bcrypt.hash(password, salt);

  //   create user
  const createUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hassedPassword,
    },
  });
  res.status(200).json({
    status: "success",
    message: "User created successfully",
    data: {
      user: {
        id: createUser.id,
        name: name,
        email: email,
      },
      // token,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // check user email exist into the db
  const userExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  // if no user found
  if (!userExist) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  // verify password
  const isPasswordValid = await bcrypt.compare(password, userExist.password);

  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  // generate a token
  const token = generateToken(userExist.id, res);

  res.status(200).json({
    status: "success",
    message: "User login successfully",
    data: {
      user: {
        id: userExist.id,
        email: email,
      },
      token,
    },
  });
};

const logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res
    .status(200)
    .json({ status: "success", message: "User logout successfully" });
};

module.exports = { register, login, logout };
