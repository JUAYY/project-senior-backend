const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const findOneById = async (req, res) => {
  const { id } = req.params;
  const template = await prisma.template.findUnique({ where: { id } });
  if (!template) {
    return res.status(400).json({ message: `template ${id} not found` });
  }
  res.status(200).json(template);
};

const find = async (req, res) => {
  try {
    const templates = await prisma.template.findMany();
    res.status(200).json({ data: templates });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const create = async (req, res) => {
  const { name, elements } = req.body;

  if (!name || !elements || !elements.length) {
    return res.status(400).json({ message: "invalid name or elements" });
  }

  await prisma.template.create({ data: { name, elements } });

  res.status(200).json({ message: "success" });
};

const update = async (req, res) => {
  const { id } = req.params;

  const template = await prisma.template.findUnique({ where: { id } });
  if (!template) {
    return res.status(400).json({ message: `template ${id} not found` });
  }

  Object.assign(template, req.body);

  delete template.id;
  await prisma.template.update({ where: { id }, data: template });

  res.status(200).json({ message: "success" });
};

const remove = async (req, res) => {
  const { id } = req.params;

  const template = await prisma.template.findUnique({ where: { id } });
  if (!template) {
    return res.status(400).json({ message: `template ${id} not found` });
  }

  await prisma.template.delete({ where: { id } });

  res.status(200).json({ message: "success" });
};

module.exports = {
  findOneById,
  find,
  create,
  update,
  remove,
};
