import User from "@/server/models/User";
import { connectToDatabase } from "@/server/config/database";

export const resolvers = {
  Query: {
    users: async () => {
      await connectToDatabase();
      return User.find();
    },
    user: async (_, { id }) => {
      await connectToDatabase();
      return User.findById(id);
    }
  },
  Mutation: {
    createUser: async (_, { name, email, age }) => {
      await connectToDatabase();
      const newUser = new User({ name, email, age });
      return newUser.save();
    },
    updateUser: async (_, { id, name, email, age }) => {
      await connectToDatabase();
      return User.findByIdAndUpdate(id, { name, email, age }, { new: true });
    },
    deleteUser: async (_, { id }) => {
      await connectToDatabase();
      return User.findByIdAndDelete(id);
    }
  }
};
