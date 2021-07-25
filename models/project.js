import mongoose from "mongoose";

const project = new mongoose.Schema({
  thumbnail: { type: String, required: true },
  image: { type: String, required: true },
  projectName: { type: String, required: true },
  shortDescription: { type: String, required: false },
  longDescription: { type: String, required: false },
  technology: { type: String, required: false },
  status: { type: String, required: true },
  feature: {type: String, required: true},
  git: { type: String, required: true },
});


export default mongoose.models.project || mongoose.model("project", project);
