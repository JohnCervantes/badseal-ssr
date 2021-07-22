import mongoose from "mongoose";

const project = new mongoose.Schema({
  thumbnail: { type: String, required: true },
  image: { type: String, required: true },
  projectName: { type: String, required: true },
  description: { type: String, required: true },
  technology: { type: String, required: true },
  status: { type: String, required: true },
  feature: {type: String, required: true}
});


export default mongoose.models.project || mongoose.model("project", project);
