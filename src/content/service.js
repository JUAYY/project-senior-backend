const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();

const findOneById = async (req, res) => {
  const { id } = req.params;
  const content = await prisma.content.findUnique({
    where: { id },
    include: { user: true },
  });
  if (!content) {
    return res.status(400).json({ message: `content ${id} not found` });
  }
  res.status(200).json(content);
};

const find = async (req, res) => {
  const { user_id } = req.query;

  const where = {};

  if (user_id) where.user_id = user_id;

  const content = await prisma.content.findMany({
    where,
    include: { user: true },
  });

  res.status(200).json({ data: content });
};

const create = async (req, res) => {
  const { name, elements, user_id, cover_image_url } = req.body;

  if (!name || !elements || !elements.length || !user_id || !cover_image_url) {
    return res.status(400).json({ message: "invalid name or elements" });
  }

  const user = await prisma.user.findUnique({ where: { id: user_id } });
  if (!user) {
    return res.status(400).json({ message: "user not found" });
  }

  await prisma.content.create({
    data: { name, elements, user_id, cover_image_url },
  });

  res.status(200).json({ message: "success" });
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, elements, cover_image_url } = req.body;

    // checking for availble content
    const content = await prisma.content.findUnique({ where: { id } });
    if (!content) {
      return res.status(400).json({ message: "content not found" });
    }

    // update data
    if (name) content.name = name;
    if (elements.length) content.elements = elements;
    if (cover_image_url) content.cover_image_url = cover_image_url;

    delete content.id;
    await prisma.content.update({ where: { id }, data: content });

    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  // checking for availble content
  const content = await prisma.content.findUnique({ where: { id: id } });
  if (!content) {
    return res.status(400).json({ message: "content not found" });
  }

  await prisma.content.delete({ where: { id: content.id } });

  res.status(200).json({ message: "success" });
};

module.exports = {
  findOneById,
  find,
  create,
  update,
  remove,
};
