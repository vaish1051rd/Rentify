const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    streetAddress: {
      type: String,
      required: true,
    },
    aptSuite: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    guestCount: {
      type: Number,
      required: true,
      min: 1,
    },
    bedroomCount: {
      type: Number,
      required: true,
      min: 1,
    },
    bedCount: {
      type: Number,
      required: true,
      min: 1,
    },
    bathroomCount: {
      type: Number,
      required: true,
      min: 1,
    },
    amenities: {
      type: [String],
      default: []
    },
    listingPhotoPaths: {
      type: [String], // Store photo URLs
      default: []
    },
    title: {
      type: String,
      required: true,
      maxlength: 100
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000
    },
    highlight: {
      type: String,
      required: true,
      maxlength: 200
    },
    highlightDesc: {
      type: String,
      required: true,
      maxlength: 1000
    },
    price: {
      type: Number,
      required: true,
      min: 0
    }
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", ListingSchema);

module.exports = Listing;
