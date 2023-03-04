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
    artist_name: {
      type: String,
      required: true,
    },
    profile_img: String,
    location: {
      city: String,
      country: String,
    },
    samples: [{type: Schema.Types.ObjectId, ref: "Sample"}],
    packs: [{type: Schema.Types.ObjectId, ref: "Pack"}],
    // collections: [{type: Schema.Types.ObjectId, ref: "Collection"}],
    reposts: [{type: Schema.Types.ObjectId, ref: "Repost"}],
    followers: [{type: Schema.Types.ObjectId, ref: "User"}],
    following: [{type: Schema.Types.ObjectId, ref: "User"}],
    bio: String,
    social_links:{
      social_media_platform: String,
      social_media_link: String
    }
  },
  {
    timeseries: true,
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;