import mongoose from "mongoose";
import mongoose_lean_virtuals from "mongoose-lean-virtuals";
import { SiteType } from "@/config/enums";

const Schema = mongoose.Schema;

const page_schema = new Schema({
  url: { type: String, required: true, trim: true },
  site: {
    type: String,
    required: true,
    trim: true,
    enum: [SiteType.VNEXPRESS],
  },
  created_at: { type: Date, required: true, default: new Date() },
});

page_schema.plugin(mongoose_lean_virtuals);

page_schema.index({ created_at: -1 });

export default page_schema;
