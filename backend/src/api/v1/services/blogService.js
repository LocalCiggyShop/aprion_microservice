import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient() // Development only, you should not create instances for production as it will strain the server.

// prisma.$use(async (params, next) => {
//   if (params.args?.cursor) {
//     const key = _.lowerFirst(params.model)
//     const result = await prisma[key].findUniqueOrThrow({
//       where: params.args.cursor,
//       select: params.args.orderBy ? _(params.args.orderBy).mapValues(x => true).value() : undefined,
//     })
//     params.args.where = {
//       ...params.args.where,
//       ..._(params.args.cursor).mapValues((x, k) => ({
//         [x === 'desc' ? 'lte' : 'gte']: result[k],
//       })).value(),
//       ..._(params.args.orderBy).mapValues((x, k) => ({
//         [x === 'desc' ? 'lte' : 'gte']: result[k],
//       })).value(),
//     }
//     delete params.args.cursor
//   }
//   return await next(params)
// })

const getAll = async () => Promise.resolve(await prisma.blog.findMany()
  .finally(async () => {
    await prisma.$disconnect();
  }));
const getById = async (id) => Promise.resolve(await prisma.blog.findUnique({ where: { id: Number(id) }}
  // .finally(async () => {
  //   await prisma.$disconnect();
  // })));
));
const createBlog = async (title, content, published, authorId) => {
  Promise.resolve(await prisma.blog.create({ data: { title: title, content: content, published: published, authorId: authorId } })
  .finally(async () => {
    await prisma.$disconnect();
  }))
}
const deleteBlog = async (id) => {
  Promise.resolve(await prisma.blog.delete({ where: { id: Number(id) } })
  .finally(async () => {
    await prisma.$disconnect();
  }))
}

export default {
  getById,
  getAll,
  createBlog,
  deleteBlog
};
