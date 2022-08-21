import bcrypt from "bcryptjs";
import connectDB from "../../../config/db";

import Agent from "../../../models/agents";
connectDB();

export default async function loginAgent(req, res) {
  try {
    console.log(req.body);

    let agent = await Agent.findOne({ email: req.body.email });
    // if (agent && (await bcrypt.compare(req.body.password, agent.password))) {
    //   console.log(agent, "The agent");
    //   return res.status(200).send(agent);
    // } else {
    //   console.log("No agent found");
    //   return res.send("No agent found");
    // }
    if (!agent) {
      console.log("No agent found");
      res.send("No agent found");
    } else {
      await bcrypt.compare(
        req.body.password,
        agent.password,
        (err, isMatch) => {
          if (err) console.log(err, "bcrypt compare error");
          if (isMatch) {
            console.log(agent, "logged in agent");
            res.status(200).json(agent);
          } else {
            console.log("Incorrect password");
            res.send("Incorrect password");
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("An error occurred" + " " + error);
  }
}
