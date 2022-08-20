import { Schema, model, models } from "mongoose";
import slugify from "slugify";
const propertiesSchema = new Schema({
  title: { type: String },
  detail: { type: String },
  address: { type: String },
  image: [String],
  image_id: [String],
  price: { type: String },
  agent: { type: String },
  tag: { type: String },
  slug: { type: String },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

propertiesSchema.pre("validate", function () {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
});

const Property = models.properties || model("properties", propertiesSchema);

export default Property;
