import { ArticleResolvers } from "../../gqlTypes";

export const Article: ArticleResolvers = {
  categories: async (parent, {}, { prisma }) => {
    const categories = await prisma.article
      .findUnique({ where: { id: parent.id } })
      .categories();

    if (categories === null) {
      return [];
    }

    return categories;
  },
  user: async (parent, {}, { prisma }) => {
    const user = await prisma.article
      .findUnique({ where: { id: parent.id } })
      .user();

    if (user === null) {
      return null;
    }

    return user;
  },
};
