import express from "express";
import bodyParser from "body-parser";
import studentRoutes from "./routes/studentRoutes.js";
import batchRoutes from "./routes/batchRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import mongoose from "mongoose";

const app = express();

app.use(bodyParser.json());

app.use("/student", studentRoutes);
app.use("/batch", batchRoutes);
app.use("/course", courseRoutes);

try {
  mongoose.connect("mongodb://localhost:27017/student-mgmt-db").then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Listening on PORT ${process.env.PORT}`);
    });
  });
} catch (error) {
  console.error(`Mongoose Connection Error.\nError:${error.message}`);
}

export default app;
