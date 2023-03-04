const { Schema, model } = require("mongoose");

const packSchema = new Schema(
  {
    creator: [{type: Schema.Types.ObjectId, ref: "User"}],
    samples: [{type: Schema.Types.ObjectId, ref: "Sample"}],
    pack_name: {
      type: String,
      required: true
    },
    music_tags: [String],
    instruments: [String],
    genres: [String],
    artist_name: String,
    pack_img: String,
    length_of_sample: Number,
    number_of_reposts: Number,
    number_of_downloads: Number,
  },
  {
    timeseries: true,
    timestamps: true,
  }
);

const Pack = model("Pack", packSchema);

module.exports = Pack;