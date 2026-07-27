import prisma from "../db/prisma.js";
import type { Prisma } from "../generated/prisma/client.js";

const getAllUsersService = () => {
  return prisma.user.findMany({
    select: {
      id: true,
      username: true,
      role: true,
      recipes: {
        select: {
          id: true,
          title: true,
          description: true,
          difficulty: true,
          category: true,
        },
      },
    },
  });
};

const getMeService = (id: number) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      recipes: {
        select: {
          id: true,
          title: true,
          description: true,
          difficulty: true,
          category: true,
        },
      },
    },
  });
};

const getUserByIdService = (id: number) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      recipes: {
        select: {
          id: true,
          title: true,
          description: true,
          difficulty: true,
          category: true,
        },
      },
    },
  });
};

const updateUserService = (id: number, data: Prisma.UserUpdateInput) => {
  return prisma.user.update({
    where: {
      id,
    },
    data,
    include: {
      recipes: {
        select: {
          id: true,
          title: true,
          description: true,
          difficulty: true,
          category: true,
        },
      },
    },
  });
};

const deleteUserService = (id: number) => {
  return prisma.user.delete({
    where: {
      id,
    },
    include: {
      recipes: {
        select: {
          id: true,
          title: true,
          description: true,
          difficulty: true,
          category: true,
        },
      },
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
