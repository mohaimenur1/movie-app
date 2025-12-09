const { prisma } = require("../config/db");
const bcrypt = require("bcryptjs");

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
  if (!user) {
    return res.status(400).json({ error: "Invalid email or password" });
  }
};

module.exports = register;
