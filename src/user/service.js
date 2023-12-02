const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const register = async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res
      .status(400)
      .json({ message: "email, username, password are required" });
  }

  await prisma.user.create({
    data: {
      email,
      username,
      password,
    },
  });

  console.log({ email, username, password });

  return res.status(200).json({ message: "success" });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "email, password are required" });
  }

  const user = await prisma.user.findFirst({
    where: {
      email,
      password,
    },
  });

  if (!user) {
    return res.status(400).json({ message: "email or password is wrong" });
  }
  return res.status(200).json(user);
};

module.exports = {
  register,
  login,
};
