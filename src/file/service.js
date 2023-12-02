const { PrismaClient, Prisma } = require("@prisma/client");
const { uploadToCloud } = require("../storage/service");

const prisma = new PrismaClient();

const find = async (req, res) => {
  const { category, user_id } = req.query;

  const where = {};

  if (category) where.url = { contains: category, mode: "insensitive" };

  if (user_id) where.user_id = user_id;

  const files = await prisma.file.findMany({ where });

  res.status(200).json({ data: files });
};

const create = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: `file is empty` });
    }

    const url = await uploadToCloud(req.file);

    const file = await prisma.file.create({
      data: {
        url,
        name: req.file.originalname,
        user_id: req.body.user_id ?? null,
      },
    });

    return res.status(200).json(file);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error" });
  }
};

module.exports = {
  create,
  find,
};
