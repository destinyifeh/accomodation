import nc from "next-connect";
import bcrypt from "bcryptjs";
import Agent from "../../../models/agents";
import connectDB from "../../../config/db";

connectDB();

const handler = nc().post(async (req, res) => {
  try {
    const agent = await Agent.findOne({ email: req.body.email });
    console.log(req.body.password);
    if (!agent) {
      const setPassword = await bcrypt.genSalt(10);
      const securePassword = await bcrypt.hash(req.body.password, setPassword);
      console.log(securePassword);

      const agentDetail = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        picture: req.body.picture,
        password: securePassword,
      };

      const newAgent = await Agent.create(agentDetail);
      console.log("new agents", newAgent);
      res.status(200).json(newAgent);
    } else {
      console.log("Agent with this email already exist");
      return res.send("Agent exist");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json("An error occurred" + " " + error.message);
  }
});

export default handler;
