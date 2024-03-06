import { UserResolvers } from "../../gqlTypes";

export const User: UserResolvers = {
  articles: async (parent, {}, { prisma }) => {
    const articles = await prisma.user
      .findUnique({ where: { id: parent.id } })
      .articles();

    if (articles === null) {
      return [];
    }

    return articles;
  },
};
