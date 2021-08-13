const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const geoCoder = require('../utils/geocoder');

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
  // {
  // type: {
  // type: String,
  // enum: ['Point']
  // },
  // coordinates: {
  //   type: [Number],
  //   index: '2dsphere'
  // },
  // formattedAddress: String,
  // city: String
  // },
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


// journalSchema.pre('save', async function(next) {
//   const loc = await geoCoder.geocode(this.journalAddress);
//   this.location = {
//       type: 'Point',
//       coordinates: [loc[0].longitude, loc[0].latitude],
//       city: loc[0].city,
//       formattedAddress: loc[0].formattedAddress
//   };

//   // Do not save address
//   this.journalAddress = undefined;
//   next();
// });

const Journal = model('Journal', journalSchema);

module.exports = Journal;
