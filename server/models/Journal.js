const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const journalSchema = new Schema({
  journalTitle: {
    type: String,
    required: 'What is your journal title?',
    minlength: 1,
    maxlength: 100,
    trim: true,
  },
  journalAddress: {
    type: String,
    required: [true, 'Please add an address']
  },
  journalLatLng: new Schema({
    lat: Number,
    lng: Number
  }),
  journalText: {
    type: String,
    required: 'You need to leave a journal entry!',
    minlength: 1,
    maxlength: 500,
    trim: true,
  },
  journalAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  }
});

const Journal = model('Journal', journalSchema);

module.exports = Journal;
