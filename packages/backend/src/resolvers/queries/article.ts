import { QueryResolvers } from "../../gqlTypes";

export const articles: QueryResolvers["articles"] = async (
  {},
  {},
  { prisma }
) => {
  return prisma.article.findMany();
};

export const article: QueryResolvers["article"] = async (
  {},
  { id },
  { prisma }
) => {
  return prisma.article.findUnique({
    where: {
      id,
    },
  });
};
