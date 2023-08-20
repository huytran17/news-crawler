import mongoose from "mongoose";
import mongoose_lean_virtuals from "mongoose-lean-virtuals";

const Schema = mongoose.Schema;

const post_schema = new Schema<IPost>({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: "", trim: true },
  content: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  created_at: { type: Date, default: new Date() },
});

post_schema.plugin(mongoose_lean_virtuals);

post_schema.index({ created_at: -1 });

export default post_schema;
