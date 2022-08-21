import connectDB from "../../../config/db";
import Agent from "../../../models/agents";

connectDB();

export default async function fetchUsers(req, res) {
  try {
    const agents = await Agent.find({}).sort({ createdAt: -1 });
    res.status(200).json(agents);
    console.log(agents);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
