import { QueryResolvers } from "../../gqlTypes";

export const users: QueryResolvers["users"] = async ({}, {}, { prisma }) => {
  return prisma.user.findMany();
};

export const user: QueryResolvers["user"] = async ({}, { id }, { prisma }) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
};
