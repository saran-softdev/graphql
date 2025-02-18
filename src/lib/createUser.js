import { ApolloClient, InMemoryCache } from "@apollo/client";

const addUser = new ApolloClient({
  uri:
    process.env.NEXT_PUBLIC_GRAPHQL_API || "http://localhost:3000/api/adduser",
  cache: new InMemoryCache()
});

export default addUser;
