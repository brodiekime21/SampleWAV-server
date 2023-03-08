const { Schema, model } = require("mongoose");

const packSchema = new Schema(
  {
    creator: {type: Schema.Types.ObjectId, ref: "User"},
    samples: [{type: Schema.Types.ObjectId, ref: "Sample"}],
    pack_name: {
      type: String,
      required: true
    },
    instruments: [String],
    genres: [String],
    pack_image: String,
    number_of_reposts: Number,
    number_of_downloads: Number,
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

const Pack = model("Pack", packSchema);

module.exports = Pack;