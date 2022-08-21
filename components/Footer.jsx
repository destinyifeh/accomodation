import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Scroll from "./Scroll";

export default function Footer() {
  const [email, setEmail] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const sub = {
        email: email,
      };
      console.log(sub, "sub email");
      setEmail("");
      toast.success("Successfully subscribed");
    } catch (err) {
      console.log(err.messsage);
      toast.error("Oops! An error occurred");
    }
  }
  return (
    <>
      <section
        className="footer-content p-4 mt-12"
        style={{ background: "#2d2926ff" }}
      >
        <div className=" grid md:grid-cols-2 p-4 ">
          <div className="sub mt-4 md:mt-0 text-white">
            <h2 className="text-center mb-2" id="h2">
              Newsletter
            </h2>
            <p className="md:text-center">
              Join our active users and start receiving our daily updates
            </p>
            <form className="p-3" onSubmit={onSubmit}>
              <div className="mb-3">
                <label>
                  Email <span className="text-red-500 font-bold">*</span>
                </label>
                <input
                  className="w-full rounded p-3"
                  type="email"
                  placeholder="your name"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ background: "ghostWhite" }}
                />
              </div>
              <div>
                <button
                  className="w-full p-2 shadow shadow-lg"
                  type="submit"
                  disabled={email.length === 0}
                  style={
                    email.length === 0
                      ? {
                          background: "#dddd",
                          borderRadius: "5px",
                          color: "white",
                        }
                      : {
                          background: "black",
                          borderRadius: "5px",
                          color: "white",
                        }
                  }
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>

          <div className="company-info text-center text-white ">
            <h2 className="text-center p-2" id="h2">
              Quick Links
            </h2>

            <a href="/about">
              <p className="">About</p>
            </a>
            <a href="/contact">
              <p className="">Contact</p>
            </a>
            <a href="/vision">
              <p className="">Vision</p>
            </a>
            <a href="/mission">
              {" "}
              <p className="">Mission</p>
            </a>

            <a href="/properties">
              <p className="">Sales</p>
            </a>
            <a href="/properties">
              <p className="">Rents</p>
            </a>

            <a href="/agents">
              <p className="">Agents</p>
            </a>
          </div>
        </div>

        <div className="copy-right text-white">
          <p className="text-center p-3">
            Accommodation &copy; 2022. All rights reserved
          </p>
          <Scroll />
        </div>
      </section>
    </>
  );
}
