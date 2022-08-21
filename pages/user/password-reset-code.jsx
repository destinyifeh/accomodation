import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { DotPulse } from "@uiball/loaders";
import Header from "../../components/Header2";
import { sendForgotCode } from "../../services/agents/api";
import { getAgents } from "../../services/agents/api";
import { resetPasswordPage } from "../../services/requesters";

const Resetcode = () => {
  const router = useRouter();
  const style = {
    padding: "15px",
    background: "#e94b3cff",
    color: "white",

    boxShadow: "0px 2px 2px gray",
    borderRadius: "10px",
  };

  const [resetPasswordToken, setResetPasswordToken] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [agents, setAgents] = useState([]);
  async function sendRequestAgent() {
    try {
      const { data } = await getAgents;
      const agents = data;
      setAgents(agents);
      console.log("agentshow", agents);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    sendRequestAgent();
  }, []);
  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const theCode = {
        resetPasswordToken: resetPasswordToken,
      };
      console.log("theCode", theCode);
      setSubmitting(true);

      const checkCode = await agents?.map((agent) => agent.resetPasswordToken);
      if (!resetPasswordToken || resetPasswordToken === " ") {
        console.log("Enter reset code");
        toast.info("Enter reset code");
        setSubmitting(false);

        return false;
      } else if (resetPasswordToken.length !== 6) {
        console.log("Reset code must be 6 characters");
        toast.info("Reset code must be 6 characters");
        setSubmitting(false);

        return false;
      } else if (checkCode.includes(resetPasswordToken)) {
        sendForgotCode(theCode)
          .then((res) => {
            console.log(res.data, "Reset code data");
            if (
              res.data === " Password reset token is invalid or has expired"
            ) {
              console.log("Password reset token is invalid or has expired");
              toast.info("Password reset token is invalid or has expired");
            } else {
              toast.success("Password reset token is valid ");

              //router.push(`${resetPasswordPage}/${res.data._id}`);
              window.location.href = `${resetPasswordPage}/${res.data._id}`;
            }

            setSubmitting(false);
          })
          .catch((err) => {
            console.log(err);
            setSubmitting(false);
            toast.error("Oops! An error occurred");
          });
        return true;
      } else {
        console.log("Password reset token is invalid or has expired");
        toast.info("Password reset token is invalid sor has expired");
        setSubmitting(false);

        return false;
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "Oops! An error occurred, make sure your network is working fine"
      );
    }
  }
  return (
    <>
      <Header />
      <section className="login p-3 mx-3 md:mx-auto md:w-1/2" style={style}>
        <h4 className="text-center" id="h4">
          Enter Password Reset Code
        </h4>
        <form className="p-2 login-form" onSubmit={handleSubmit}>
          <div className="">
            <h5 id="h5" className="flex justify-left">
              Code
            </h5>
            <input
              className="w-full rounded-lg text-black"
              type="text"
              name="reset-code"
              value={resetPasswordToken}
              onChange={(e) => setResetPasswordToken(e.target.value)}
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
        {/* <div className="p-2">
          <a
            href="#"
            className="float-left "
            onClick={login ? handleForgot : handleForgot2}
          >
            Forgot password? <i className="fa fa-arrow-circle-o-right"></i>
          </a>

          <br />
          <a
            href="#"
            className="float-left "
            onClick={login ? handleRegister : handleRegister2}
          >
            Register as an agent <i className="fa fa-arrow-circle-o-right"></i>{" "}
          </a>
        </div> */}
      </section>
    </>
  );
};

export default Resetcode;

// export async function getStaticProps() {
//   try {
//     const { data } = await getAgents;

//     return {
//       props: {
//         agents: data,
//       },
//     };
//   } catch (err) {
//     console.log(err);
//   }
// }
