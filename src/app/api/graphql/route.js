import { createSchema, createYoga } from "graphql-yoga";
import { typeDefs } from "@/server/graphql/schema";
import { resolvers } from "@/server/controllers/userController";

export const dynamic = "force-dynamic"; // Ensure API always fetches fresh data

const schema = createSchema({ typeDefs, resolvers });

const yoga = createYoga({ schema });

export const GET = yoga;
export const POST = yoga;
