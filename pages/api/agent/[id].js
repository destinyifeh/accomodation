import connectDB from "../../../config/db";
import Agent from "../../../models/agents";

connectDB();

export default async function agentId(req, res) {
  try {
    const agent = await Agent.findOne({ _id: req.query.id });

    if (agent) {
      console.log("Changing password agent", agent);

      return res.status(200).json(agent);
    } else {
      console.log("Agent does not exist");

      return res.status(400).json("Agent does not exist");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server error" + "" + error.message);
  }
}
