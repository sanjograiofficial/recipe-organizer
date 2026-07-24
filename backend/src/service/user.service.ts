import prisma from "../db/prisma.js";
import type { Prisma } from "../generated/prisma/client.js";

const getAllUsersService = () => {
  return prisma.user.findMany({
    select: {
      id: true,
      username: true,
      role: true,
    },
  });
};

const getMeService = (id: number) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
};

const getUserByIdService = (id: number) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
};

const updateUserService = (id: number, data: Prisma.UserUpdateInput) => {
  return prisma.user.update({
    where: {
      id,
    },
    data,
  });
};

const deleteUserService = (id: number) => {
  return prisma.user.delete({
    where: {
      id,
    },
  });
};

export {
  getAllUsersService,
  getMeService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
};
