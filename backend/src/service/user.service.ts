import prisma from "../db/prisma.js";
import type { Prisma } from "../generated/prisma/client.js";

const getAllUsersService = () => {
  return prisma.user.findMany({
    select: {
      id: true,
      username: true,
      profileImage: true,
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
    select: {
      id: true,
      username: true,
      profileImage: true,
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

const getUserByIdService = (id: number) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      username: true,
      profileImage: true,
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

const updateUserService = async (
  id: number,
  userId: number,
  data: Prisma.UserUpdateInput,
) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!existingUser) throw new Error("User not found");

  if (existingUser.id !== userId) throw new Error("Forbidden");

  return prisma.user.update({
    where: {
      id,
    },
    data,
    select: {
      id: true,
      username: true,
      profileImage: true,
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

const uploadProfileService = async (
  id: number,
  userId: number,
  profileImage: string,
) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!existingUser) throw new Error("User with that id not found");

  if (existingUser.id !== userId) throw new Error("Forbidden");

  return prisma.user.update({
    where: {
      id,
    },
    data: {
      profileImage,
    },
    select: {
      id: true,
      username: true,
      profileImage: true,
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

const deleteUserService = async (id: number, userId: number) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!existingUser) throw new Error("User with that id not found");

  if (existingUser.id !== userId) throw new Error("Forbidden");
  return prisma.user.delete({
    where: {
      id,
    },
    select: {
      id: true,
      username: true,
      profileImage: true,
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

export {
  getAllUsersService,
  getMeService,
  getUserByIdService,
  updateUserService,
  uploadProfileService,
  deleteUserService,
};
