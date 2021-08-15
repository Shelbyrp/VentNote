const { AuthenticationError } = require('apollo-server-express');
const { User, Journal } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('journals');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('journals');
    },
    journals: async (parent, { username }) => {
      const params = username ? { username } : {};
      const journals = await Journal.find(params).sort({ createdAt: -1 });
      console.log("journals", journals)
      return journals;
    },
    journal: async (parent, { journalId }) => {
      const journal = await Journal.findOne({ _id: journalId });
      console.log("journal", journal)
      return journal;
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id }).populate('journals');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
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
    addJournal: async (parent, { journalTitle, journalAddress, journalLatLng, journalText }, context) => {
      if (context.user) {
        const journal = await Journal.create({
          journalTitle,
          journalAddress,
          journalLatLng,
          journalText,
          journalAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { journals: journal._id } }
        );

        return journal;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    updateJournal: async (parent, { journalId, journalText }, context) => {
        try {
        const journal = await Journal.findByIdAndUpdate(
          journalId, 
          { journalText },
          { new: true }
        );
        return;
      } catch (error) {
        throw error;
      }
    },
    removeJournal: async (parent, { journalId }, context) => {
      if (context.user) {
        const journal = await Journal.findOneAndDelete({
          _id: journalId,
          // journalAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { journals: journal._id } }
        );

        return journal;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
