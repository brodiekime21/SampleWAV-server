const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    artistName: String,
    profileImg: String,
    location: String,
    samples: [{type: Schema.Types.ObjectId, ref: "Sample"}]
  },
  {
    timeseries: true,
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;