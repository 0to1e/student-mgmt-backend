import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  fName: { type: String, required: true },
  lName: { type: String, required: true },
  image: { type: String },
  phone: { type: String, required: true },
  batch: { type: mongoose.Schema.Types.ObjectId, ref: "Batch", required: true },
  courses: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  ],
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Student = mongoose.model("students", studentSchema);

export default Student;
