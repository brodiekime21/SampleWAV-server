const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
    type: String,
    required: true,
    unique: true
    },
    password: {
      type: String,
      required: true,
    },
    artistName: {
      type: String,
      required: true,
    },
    profileImg: String,
    city: String,
    country: String,
    samples: [{type: Schema.Types.ObjectId, ref: "Sample"}],


  },
  {
    timeseries: true,
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;