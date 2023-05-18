import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient() // Development only, you should not create instances for production as it will strain the server.

const getAll = async () => Promise.resolve(await prisma.blog.findMany()
  .finally(async () => {
    await prisma.$disconnect();
  }));
const getById = async (id) => Promise.resolve(await prisma.blog.findUnique({ where: { id: Number(id) }}
  .finally(async () => {
    await prisma.$disconnect();
  })));

const createBlog = async (username, email, password) => {
  Promise.resolve(await prisma.blog.create({ data:  { name: username, email: email, password: password } })
  .finally(async () => {
    await prisma.$disconnect();
  }))
}

export default {
  getById,
  getAll,
  createBlog
};
