import { QueryResolvers } from "../../gqlTypes";

export const categories: QueryResolvers["categories"] = async (
  {},
  {},
  { prisma }
) => {
  return prisma.category.findMany();
};

export const category: QueryResolvers["category"] = async (
  {},
  { id },
  { prisma }
) => {
  return prisma.category.findUnique({
    where: {
      id,
    },
  });
};
