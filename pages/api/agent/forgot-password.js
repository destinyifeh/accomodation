import nodemailer from "nodemailer";
import dotenv from "dotenv";
import connectDB from "../../../config/db";
import Agent from "../../../models/agents";
dotenv.config();

connectDB();

export default async function forgotPassword(req, res) {
  try {
    console.log(req.body, "body");
    let agent = await Agent.findOne({ email: req.body.email });
    console.log(agent, "agent");
    if (!agent) {
      console.log("no agent");
      return res.json("Agent not found");
    } else {
      let token = Math.random().toString().substr(2, 6);
      agent.resetPasswordToken = token;
      agent.resetPasswordExpires = Date.now() + 3600000; // 1 hour
      console.log(agent.resetPasswordToken);
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.GMAIL_EMAIL,
          pass: process.env.GMAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
      var mailOptions = {
        to: agent.email,
        from: "Accommodation <noreply." + process.env.GMAIL_EMAIL + ">",
        subject: "Accomodation - Password Reset For Agent",
        text:
          "You are receiving this because you (or someone else)  have requested the reset of the password for your agent account on accommodation website.\n\n" +
          "Please copy the following password reset code, to complete the process:\n\n" +
          "Password reset code: " +
          " " +
          agent.resetPasswordToken +
          "\n\n" +
          "If you did not create this, please ignore this email.\n",
      };

      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.log(err);
          return res.status(400).send("Error:" + " " + err);
        }
        agent.save();
        console.log(info.response);
        return res
          .status(200)
          .send(
            "Password reset email has been sent to your email:" +
              info.response +
              " " +
              agent
          );
      });
      //Reset password email end
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json("Server error" + " " + err);
  }
}
