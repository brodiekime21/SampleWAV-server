const { Schema, model } = require("mongoose");

const sampleSchema = new Schema(
  {
    creator: [{type: Schema.Types.ObjectId, ref: "User"}],
    sample_file: {
      type: String,
      required: true
    },
    sample_name: {
      type: String,
      required: true
    },
    music_tags: [String],
    instrument: String,
    genres: [String],
    key: String,
    bpm: Number,
    type: String,
    artist_name: String,
    sample_img: String,
    pack: [{type: Schema.Types.ObjectId, ref: "Pack"}],
    number_of_samples: Number,
    number_of_reposts: Number,
    number_of_downloads: Number,
  },
  {
    timeseries: true,
    timestamps: true,
  }
);

const Sample = model("Sample", sampleSchema);

module.exports = Sample;