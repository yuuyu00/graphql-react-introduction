import { Resolvers } from "../gqlTypes";
import * as Queries from "./queries";
import * as Mutations from "./mutations";
import * as Trivials from "./trivials";

const Query: Resolvers["Query"] = Queries;
const Mutation: Resolvers["Mutation"] = Mutations;

export const resolvers: Resolvers = {
  Query,
  Mutation,
  ...Trivials,
};
