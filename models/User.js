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
    profile_image: {
      type: String,
      default: "https://res.cloudinary.com/dc6w7a0c8/image/upload/v1678223756/SampleWAV/blank-profile_gztpuo.webp"
    },
    city: {
      type: String,
      default: 'city',
    },
    country: {
      type: String,
      default: 'country',
    },    
    samples: [{type: Schema.Types.ObjectId, ref: "Sample"}],
    packs: [{type: Schema.Types.ObjectId, ref: "Pack"}],
    // collections: [{type: Schema.Types.ObjectId, ref: "Collection"}],
    reposts: [{type: Schema.Types.ObjectId, ref: "Repost"}],
    followers: [{type: Schema.Types.ObjectId, ref: "User"}],
    following: [{type: Schema.Types.ObjectId, ref: "User"}],
    bio: String,
    social_media_platform: [String],
    social_media_link: [String],
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

const User = model("User", userSchema);

module.exports = User;