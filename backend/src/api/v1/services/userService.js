import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient() // Development only, you should not create instances for production as it will strain the server.

const getAll = async () => Promise.resolve(await prisma.user.findMany()
  .finally(async () => {
    await prisma.$disconnect();
  }));
const getById = async (id) => Promise.resolve(await prisma.user.findUnique({ where: { id: Number(id) }}
  .finally(async () => {
    await prisma.$disconnect();
  })));
const getByUser = async (name, email) => Promise.resolve(await prisma.user.findFirst({ where: { OR: [{ name: String(name) }, { email: String(email) }] }})
  .finally(async () => {
    await prisma.$disconnect();
  }));

// const getByName = async (name) => {
//   await prisma.user.findFirst({ where: { name: String(name) } })
//   .then(async data => {
    
//   })
//   .catch(e => {
//     // Error
//     if(e instanceof Prisma.PrismaClientUnknownRequestError) {
        
//     }
//     return console.log(e)
//     //throw new Error(err);
// });
// }

const createUser = async (username, email, password) => {
  Promise.resolve(await prisma.user.create({ data:  { name: username, email: email, password: password } })
  .finally(async () => {
    await prisma.$disconnect();
  })
  // .catch((e) => {
  //   try {
  //     if(e instanceof Prisma.PrismaClientKnownRequestError) {
  //       if (e.code === 'P2002') {
  //         console.log("__MAIN ERROR: " + e)
  //          try {
  //           return "Email already exists."
  //          } catch(_) {
  //            return console.log(e)
  //          }
  //       }
  //     }
  //   } catch(err) {
  //     return console.log(err)
  //   }
  //   return console.log(e)
  //  })
    )
}

export default {
  getById,
  getAll,
  getByUser,
  createUser
};
