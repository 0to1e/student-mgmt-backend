import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  courseName: { type: String, required: true, unique: true },
});

export default mongoose.model("Course", courseSchema);
