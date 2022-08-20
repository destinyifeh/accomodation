import LocalStrategy from "passport-local";
import bcrypt from "bcryptjs";
//import passport from "passport";

import Agent from "../models/agents";

export default async function passportLocal(passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      //match user
      Agent.findOne({ email: email }).then((user) => {
        if (!user) {
          console.log("No agent found");
          return done(null, "No agent found");
        }
        //match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            console.log("Password not match");
            return done(null, "Incorrect password");
          }
        });
      });
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
}
