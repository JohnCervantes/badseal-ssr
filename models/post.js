import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const post = new mongoose.Schema({
  banner: { type: String, required: false },
  postName: { type: String, required: true },
  date: { type: String, required: true },
  shortDescription: { type: String, required: true },
  content: { type: String, required: true },
});


post.plugin(uniqueValidator);

export default mongoose.models.post || mongoose.model("post", post);
