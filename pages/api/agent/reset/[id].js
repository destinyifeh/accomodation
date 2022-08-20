import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import connectDB from "../../../../config/db";
import Agent from "../../../../models/agents";
dotenv.config();

connectDB();

export default async function newPassword(req, res) {
  try {
    console.log(req.body);
    console.log("query", req.query);
    let agent = await Agent.findOne({
      _id: req.query.id,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (agent) {
      let setPassword = await bcrypt.genSalt(10);
      let securePassword = await bcrypt.hash(req.body.password, setPassword);

      agent.password = securePassword;
      agent.resetPasswordToken = undefined;
      agent.resetPasswordExpires = undefined;

      await agent.save(async (err, agent) => {
        if (err) return res.status(400).send("Error:" + err);

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
          from: "Accomodation <noreply." + process.env.GMAIL_EMAIL + ">",
          subject: "Password Successfully Changed",
          text:
            "Hello,\n\n" +
            "This is a confirmation that the password for your agent account " +
            agent.email +
            " has just been changed.\n",
        };

        transporter.sendMail(mailOptions, function (err, info) {
          if (err) {
            console.log(err);
            return res
              .status(400)
              .send("Password reset email not sent" + "" + err);
          } else {
            console.log("Password reset email sent" + info.response);
            return res
              .status(200)
              .send("Password reset email sent" + "" + agent);
          }
        });
        //New password email end

        // req.login(agent, (err) => {
        //   if (err) return res.status(400).send("Error:" + " " + err);

        //   return res.status(200).send(agent);
        // });
      });
    } else {
      console.log("Password reset token is invalid or has expired");
      return res.send("Password reset token is invalid or has expired");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Server error" + " " + error);
  }
}
