import mongoose from "mongoose";

const testSchema = mongoose.Schema;

/**
 * Model for testing purposes
 */
export default mongoose.model(
  "test",
  new testSchema({}, { strict: false })
);
