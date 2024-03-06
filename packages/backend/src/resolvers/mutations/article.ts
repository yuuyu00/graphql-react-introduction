import { MutationResolvers } from "../../gqlTypes";

export const createArticle: MutationResolvers["createArticle"] = async (
  {},
  { input },
  { prisma }
) => {
  const article = await prisma.article.create({
    data: {
      title: input.title,
      content: input.content,
      user: {
        connect: { id: input.userId },
      },
      categories: {
        connect: input.categoryIds
          ? input.categoryIds.map((id) => ({ id }))
          : undefined,
      },
    },
  });

  return article;
};

export const updateArticle: MutationResolvers["updateArticle"] = async (
  {},
  { input },
  { prisma }
) => {
  const article = await prisma.article.update({
    where: { id: input.id },
    data: {
      title: input.title || undefined,
      content: input.content || undefined,
      categories: {
        set: input.categoryIds
          ? input.categoryIds.map((id) => ({ id }))
          : undefined,
      },
    },
  });

  return article;
};
