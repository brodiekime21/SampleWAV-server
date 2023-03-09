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
    pack_image: {
      type: String,
      default: "https://res.cloudinary.com/dc6w7a0c8/image/upload/v1678113724/SampleWAV/sound-placeholder_chg2tr.png"
    },
    number_of_reposts: Number,
    number_of_downloads: Number,
    created_at: {
      type: Date,
      default: Date.now
    },
    fileUrl: String,
  },
  {
    timeseries: true,
    timestamps: true,
  }
);

const Pack = model("Pack", packSchema);

module.exports = Pack;