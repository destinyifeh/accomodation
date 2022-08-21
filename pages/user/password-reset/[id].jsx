import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { DotPulse } from "@uiball/loaders";
import { useRouter } from "next/router";

import Header from "../../../components/Header2";
import { sendReset, getAgent, getAgents } from "../../../services/agents/api";
import { saveUser, saveToken } from "../../../services/requesters";
import { currentAgent, token } from "../../../utils/constants";
const PasswordReset = ({ agent }) => {
  console.log("The agent", agent);
  const router = useRouter();

  const style = {
    padding: "15px",
    background: "#e94b3cff",
    color: "white",

    boxShadow: "0px 2px 2px gray",
    borderRadius: "10px",
  };

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [submitting, setSubmitting] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    const newPassword = {
      password: password,
    };

    const agentId = agent._id;
    console.log("agentId", agentId);

    if (password === " ") {
      console.log("Add password");
      toast.info("Add password");
      setSubmitting(false);

      return false;
    } else if (password2 === " ") {
      console.log("Re-enter password");
      toast.info("Re-enter password");
      setSubmitting(false);

      return false;
    } else if (password !== password2) {
      console.log("Password do not match");
      toast.info("Password do not match");
      setSubmitting(false);

      return false;
    } else if (password.length < 4) {
      console.log("Password must be atleast 4 characters");
      toast.info("Password must be atleast 4 characters");
      setSubmitting(false);

      return false;
    } else {
      try {
        const res = await sendReset(agentId, newPassword);
        console.log("Reset data", res.data);
        setSubmitting(false);
        toast.success("Password changed");
        saveUser(currentAgent, res.data);
        saveToken(token, res.data._id);
        router.push("/agent/dashboard");
      } catch (error) {
        console.log(error);
        toast.error("Oops! An error occured");
        setSubmitting(false);
      }

      return true;
    }
  }
  return (
    <>
      <Header />
      <section className="login p-3 mx-3 md:mx-auto md:w-1/2" style={style}>
        <h4 className="text-center" id="h4">
          Enter New Password
        </h4>
        <form className="p-2 login-form" onSubmit={handleSubmit}>
          <div className="">
            <h5 id="h5" className="flex justify-left">
              Password
            </h5>
            <input
              className="w-full rounded-lg text-black"
              type="password"
              name="password"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="">
            <h5 id="h5" className="flex justify-left mt-2">
              Re-enter Password
            </h5>
            <input
              className="w-full rounded-lg text-black"
              type="password"
              name="password"
              placeholder="Re-enter your new password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
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
                "Proceed"
              )}
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default PasswordReset;

/*export const getStaticPaths = async() =>{

        let res = await getAgent(id)
        let data = await res.data;

          console.log('data', data)

          let paths = data.map(agent=>{
              return{
                  params:{id:agent._id.toString()}
              }
          })

        return{
              paths,
              fallback: false
        }
} */

export const getServerSideProps = async (context) => {
  try {
    const id = context.params.id;
    console.log("idi", id);
    const res = await getAgent(id);
    const agent = res.data;
    console.log("agent", agent);

    return {
      props: { agent: agent },
    };
  } catch (err) {
    console.log(err);
  }
};
