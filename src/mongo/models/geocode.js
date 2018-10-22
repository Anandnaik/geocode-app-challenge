import mongoose from 'mongoose';

const geocodeSchema = mongoose.Schema;

/**
 * Model for "geocodes" data
 */
export default mongoose.model("geocodes", new geocodeSchema({}, { strict: false }));
