import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    likes: {
      type: Array,
      default: [],
    },
    comments:{
        type:String,
        max:100
    }
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);