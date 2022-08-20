import { Schema, model, models } from "mongoose";

const agentsSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  DOB: { type: String },
  picture: { type: String },
  email: { type: String },
  password: { type: String },
  createdAt: { type: Date, default: Date.now },
  resetPasswordExpires: Date,
  resetPasswordToken: String,
});

const Agents = models.agents || model("agents", agentsSchema);

export default Agents;
