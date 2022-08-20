import connectDB from "../../../config/db";
import Agent from "../../../models/agents";

connectDB();

export default async function verifyCode(req, res) {
  try {
    let agent = await Agent.findOne({
      resetPasswordToken: req.body.resetPasswordToken,
      resetPasswordExpires: { $gt: Date.now() },
    });
    console.log(agent);
    if (agent) {
      let resetPasswordToken = req.body.resetPasswordToken;
      console.log(resetPasswordToken);
      return res.status(200).send(agent);
    } else {
      console.log("Password reset token is invalid or has expired");
      return res.send("Password reset token is invalid or has expired");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Server error" + " " + error);
  }
}
