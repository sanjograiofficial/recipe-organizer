import prisma from "../db/prisma.js";
import type { Prisma } from "../generated/prisma/client.js";

const getAllUsersService = async () => {
  return await prisma.user.findMany();
};

const getUserByIdService = async (id: number) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
};

const updateUserService = async (id: number, data: Prisma.UserUpdateInput) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data,
  });
};

const deleteUserService = async (id: number) => {
  return await prisma.user.delete({
    where: {
      id,
    },
  });
};

export {
  getAllUsersService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
};
