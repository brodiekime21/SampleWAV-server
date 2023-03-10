const { Schema, model } = require("mongoose");

const sampleSchema = new Schema(
  {
    creator: {type: Schema.Types.ObjectId, ref: "User"},
    sample_file: {
      type: String,
      required: true
    },
    sample_name: {
      type: String,
      required: true
    },
    instrument: String,
    genres: [String],
    key: String,
    bpm: {
      type: Number,
      default: 0,
    },
    type: String,
    sample_image: {
      type: String,
      default: "https://res.cloudinary.com/dc6w7a0c8/image/upload/v1678113724/SampleWAV/sound-placeholder_chg2tr.png"
    },
    pack: {type: Schema.Types.ObjectId, ref: "Pack"},
    number_of_reposts: Number,
    number_of_downloads: Number,
    length_of_sample: Number, //will be rounded to closes second
    created_at: {
      type: Date,
      default: Date.now
    },
  },
  {
    timeseries: true,
    timestamps: true,
  }
);

const Sample = model("Sample", sampleSchema);

module.exports = Sample;