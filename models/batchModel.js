import mongoose from "mongoose";

const batchSchema = new mongoose.Schema({
  batchId: {
    type: String,
    default: () => new mongoose.Types.ObjectId().toString(),
  },
  batchName: { type: String, required: true, unique: true },
});

const Batch = mongoose.model("batches", batchSchema);

export default Batch;
