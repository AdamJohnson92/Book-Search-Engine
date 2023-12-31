const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args,context) => {
      if (context.user) {
        const data = await User.findOne({_id: context.user._id}).select('-__v -password');
        return data;
      } else {
        return console.log("error! Not logged in!")
      }
      
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
    addUser: async (parent, args) => {
      try{  
        console.log("good to go!")
        const user = await User.create(args);
      const token = signToken(user);
    
      return { token, user };
      } catch (error){
        console.error(error)
      }
      
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
