import Batch from "../models/batchModel.js";

export const createBatch = async (request, response) => {
  try {
    const { batchName } = request.body;
    const batch = new Batch({ batchName });
    await batch.save();
    response.status(201).json(batch);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

// Get all batches
export const getBatches = async (request, response) => {
  try {
    const batches = await Batch.find();
    response.status(200).json(batches);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

// Get a batch by ID
export const getBatchById = async (request, response) => {
  try {
    const { id } = request.params;
    const batch = await Batch.findById(id);
    if (!batch) {
      return response.status(404).json({ message: "Batch not found" });
    }
    response.status(200).json(batch);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

// Update a batch
export const updateBatch = async (request, response) => {
  try {
    const { id } = request.params;
    const { batchName } = request.body;

    const updatedBatch = await Batch.findByIdAndUpdate(
      id,
      { batchName },
      { new: true }
    );

    if (!updatedBatch) {
      return response.status(404).json({ message: "Batch not found" });
    }

    response.status(200).json(updatedBatch);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

// Delete a batch
export const deleteBatch = async (request, response) => {
  try {
    const { id } = request.params;
    const deletedBatch = await Batch.findByIdAndDelete(id);
    if (!deletedBatch) {
      return response.status(404).json({ message: "Batch not found" });
    }
    response.status(200).json({ message: "Batch deleted successfully" });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};
