const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, { username }) => {
      return User.findOne({ username }).populate('books');
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    },
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async(parent, {authors, description, bookId, image, link, title}) => {
      const book = await Book.create({
        authors, description, bookId, image, link, title
      });

      await User.findOneAndUpdate(
        {username: username},
        {$addToSet: {books: book._id}}
      );

      return book
    },

    removeBook: async (parent, { bookId }) => {
      return Book.findOneAndDelete({ _id: bookId });
    },
  },
};

module.exports = resolvers;
