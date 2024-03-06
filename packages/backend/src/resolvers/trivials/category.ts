import { CategoryResolvers } from "../../gqlTypes";

export const Category: CategoryResolvers = {
  articles: async (parent, {}, { prisma }) => {
    const articles = await prisma.category
      .findUnique({ where: { id: parent.id } })
      .articles();

    if (articles === null) {
      return [];
    }

    return articles;
  },
};
