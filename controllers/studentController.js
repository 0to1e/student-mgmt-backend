import Student from "../models/studentModel.js";
import Batch from "../models/batchModel.js";
import Course from "../models/courseModel.js";

export const createStudent = async (request, response) => {
  try {
    const { fName, lName, image, phone, batch, courses, username, password } =
      request.body;

    // Check if the batch exists
    const batchExists = await Batch.findById(batch);
    if (!batchExists) {
      return response.status(400).json({ message: "Batch does not exist" });
    }

    // Check if all courses exist
    const coursesExist = await Course.find({ _id: { $in: courses } });
    if (coursesExist.length !== courses.length) {
      return response
        .status(400)
        .json({ message: "One or more courses do not exist" });
    }

    // Create the student
    const student = new Student({
      fName,
      lName,
      image,
      phone,
      batch,
      courses,
      username,
      password,
    });

    await student.save();
    response.status(201).json(student);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

// Get all students
export const getStudents = async (request, response) => {
  try {
    const students = await Student.find().populate("batch").populate("courses");
    response.status(200).json(students);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

// Get a student by ID
export const getStudentById = async (request, response) => {
  try {
    const { id } = request.params;
    const student = await Student.findById(id)
      .populate("batch")
      .populate("courses");
    if (!student) {
      return response.status(404).json({ message: "Student not found" });
    }
    response.status(200).json(student);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

// Update a student
export const updateStudent = async (request, response) => {
  try {
    const { id } = request.params;
    const { fName, lName, image, phone, batch, courses, username, password } =
      request.body;

    // Check if the batch exists
    if (batch) {
      const batchExists = await Batch.findById(batch);
      if (!batchExists) {
        return response.status(400).json({ message: "Batch does not exist" });
      }
    }

    // Check if all courses exist
    if (courses) {
      const coursesExist = await Course.find({ _id: { $in: courses } });
      if (coursesExist.length !== courses.length) {
        return response
          .status(400)
          .json({ message: "One or more courses do not exist" });
      }
    }

    // Update the student
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { fName, lName, image, phone, batch, courses, username, password },
      { new: true }
    )
      .populate("batch")
      .populate("courses");

    if (!updatedStudent) {
      return response.status(404).json({ message: "Student not found" });
    }

    response.status(200).json(updatedStudent);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

// Delete a student
export const deleteStudent = async (request, response) => {
  try {
    const { id } = request.params;
    const deletedStudent = await Student.findByIdAndDelete(id);
    if (!deletedStudent) {
      return response.status(404).json({ message: "Student not found" });
    }
    response.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};
