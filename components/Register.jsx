import { useEffect, useState } from "react";
import FileBase from "react-file-base64";
import { toast } from "react-toastify";
import { DotPulse } from "@uiball/loaders";
import { useRouter } from "next/router";

import { sendRegister } from "../services/agents/api";
import { saveUser, saveToken, currentUser } from "../services/requesters";
import { currentAgent, token } from "../utils/constants";
const Register = (props) => {
  const router = useRouter();

  const {
    register,
    setRegister,
    setLogin,
    setForgot,
    forgot2,
    setForgot2,
    login2,
    setLogin2,
    register2,
    setRegister2,
    agents,
  } = props;

  const style = {
    position: "absolute",
    right: 0,
    padding: "15px",
    background: "#e94b3cff",
    zIndex: 2,
    color: "white",
    marginRight: "5px",
  };

  const handleRemove = () => {
    setRegister(false);
  };

  const handleRemove2 = () => {
    setRegister2(false);
  };

  if (register) {
    setLogin(false);
  }

  const handleLogin = () => {
    setRegister(false);
    setForgot(false);
    setLogin(true);
  };

  const handleLogin2 = () => {
    setRegister2(false);
    setForgot2(false);
    setLogin2(true);
  };

  const [formData, setFormData] = useState({
    firstName: " ",
    lastName: " ",
    email: " ",
    picture: " ",
    password: "",
    password2: "",
    checkPic: true,
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      setSubmitting(true);
      const loggedIn = currentUser(currentAgent);
      console.log(loggedIn, "logged");
      if (loggedIn) {
        console.log("You already logged in");
        toast.info("You already logged in");
        setSubmitting(false);

        return false;
      } else if (!formData.firstName || formData.firstName === " ") {
        console.log("First name is empty");
        toast.info("first name is empty");
        setSubmitting(false);

        return false;
      } else if (!formData.lastName || formData.lastName === " ") {
        console.log("Last name is empty");
        toast.info("Last name is empty");
        setSubmitting(false);

        return false;
      } else if (!formData.email || formData.email === " ") {
        console.log("Email is empty");
        toast.info("Email is empty");
        setSubmitting(false);

        return false;
      } else if (formData.password.length <= 3) {
        console.log("Password must be more than 3 characters");
        toast.info("Password must be more than 3 characters");
        setSubmitting(false);

        return false;
      } else if (!formData.password || !formData.password2) {
        console.log(" Password must not be empty");
        toast.info("Password must not be empty");
        setSubmitting(false);

        return false;
      } else if (formData.checkPic) {
        console.log("Add your picture");
        toast.info("Add your picture");
        setSubmitting(false);

        return false;
      } else if (formData.password === " ") {
        console.log(" Enter password");
        toast.info("Enter password ");
        setSubmitting(false);

        return false;
      } else if (formData.password !== formData.password2) {
        console.log(" Password do not match");
        toast.info("Password do not match ");
        setSubmitting(false);

        return false;
      } else if (
        (formData.email && formData.email.includes(".coms")) ||
        formData.email.includes(".comss") ||
        formData.email.includes(".comsss") ||
        formData.email.includes(".comssss")
      ) {
        console.log("Please use .com");
        toast.info("Please use .com");
        setSubmitting(false);

        return false;
      } else if (
        (formData.email && formData.email.includes("@gmail.com")) ||
        formData.email.includes("@yahoo.com") ||
        formData.email.includes("@outlook.com")
      ) {
        console.log(formData);

        sendRegister(formData)
          .then((res) => {
            console.log(res.data);
            setSubmitting(false);
            if (res.data === "Agent exist") {
              console.log("Agent already exist");
              toast.error("Agent with this email already exist");
              return false;
            } else {
              saveUser(currentAgent, res.data);
              saveToken(token, res.data._id);
              toast.success("Registered");
              router.push("/agent/dashboard");
              return true;
            }
          })
          .catch((err) => {
            console.log(err);
            setSubmitting(false);

            toast.error("Oops!500 server error");
          });

        return true;
      } else {
        console.log(
          "Unsupported email, email must be yahoo.com, gmail.com or outlook.com"
        );
        toast.info(
          "Unsupported email, email must be gmail.com, outlook.com or yahoo.com"
        );
        setSubmitting(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Oops! An error occurred");
    }
  };
  return (
    <>
      <section className="login p-3" style={style}>
        <i
          className="fa fa-remove float-right"
          style={{ fontWeight: "bold", cursor: "pointer" }}
          onClick={register ? handleRemove : handleRemove2}
        ></i>

        <h4 className="text-center" id="h4">
          Agent Registration Form
        </h4>
        <form className="p-2 login-form" onSubmit={handleSubmit}>
          <div className="my-3">
            <h5 id="h5" className="flex justify-left">
              First Name
            </h5>
            <input
              className="w-full rounded-lg text-black"
              type="text"
              name="firstname"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
          </div>
          <div className="my-3">
            <h5 id="h5" className="flex justify-left">
              Last Name
            </h5>
            <input
              className="w-full rounded-lg text-black "
              type="text"
              name="lastname"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
          </div>

          <div className="my-3 filebase-file">
            <h5 id="h5" className="flex justify-left">
              Picture
            </h5>
            {/* <input
              className="w-full rounded-lg text-black p-1"
              type="file"
              name="image"
              onChange={(e) =>
                setFormData({ ...formData, picture: e.target.files[0] })
              }
            /> */}
            <FileBase
              type="file"
              className=""
              onDone={({ base64 }) =>
                setFormData({ ...formData, picture: base64, checkPic: false })
              }
              multiple={false}
            />
          </div>

          <div className="my-3">
            <h5 id="h5" className="flex justify-left">
              Email
            </h5>
            <input
              className="w-full rounded-lg text-black"
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="my-3">
            <h5 id="h5" className="flex justify-left">
              Password
            </h5>
            <input
              className="w-full rounded-lg text-black"
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <div className="my-3">
            <h5 id="h5" className="flex justify-left">
              Confirm Password
            </h5>
            <input
              className="w-full rounded-lg text-black"
              type="password"
              name="password2"
              value={formData.password2}
              onChange={(e) =>
                setFormData({ ...formData, password2: e.target.value })
              }
            />
          </div>

          <div className="">
            <button
              type="submit"
              className="w-full  p-2 mt-3"
              style={
                submitting ? { background: "#3a3b3c" } : { background: "black" }
              }
              disabled={submitting}
            >
              {submitting ? (
                <div className=" flex justify-center">
                  <DotPulse size={40} speed={1.3} color="white" />
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>

        <a href="#" onClick={register ? handleLogin : handleLogin2}>
          Login existing agent <i className="fa fa-arrow-circle-o-right"></i>
        </a>
      </section>
    </>
  );
};

export default Register;
