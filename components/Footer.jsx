//import { useState, useEffect } from "react";

import Scroll from "./Scroll";

export default function Footer() {
  return (
    <>
      <section
        className="footer-content p-4 mt-12"
        style={{ background: "#2d2926ff" }}
      >
        <div className=" grid md:grid-cols-2 p-4 ">
          {/* <div className="contact  ">
            <h2 className="text-center" id="h2">
              Contact Us
            </h2>
            <form className="p-3">
              <div className="">
                <label>
                  Name <span className="text-red-500 font-bold">*</span>
                </label>
                <input
                  className="w-full p-3"
                  type="text"
                  placeholder="your name"
                />
              </div>
              <div className="mb-3">
                <label>
                  Email <span className="text-red-500 font-bold">*</span>
                </label>
                <input
                  className="w-full p-3"
                  type="email"
                  placeholder="your name"
                />
              </div>
              <div>
                <button
                  className="w-full bg-blue-500 p-2 shadow shadow-lg"
                  type="submit"
                  style={{
                    background: "grey",
                    borderRadius: "5px",
                    color: "white",
                  }}
                >
                  Send Message
                </button>
              </div>
            </form>
          </div> */}

          <div className="sub mt-4 md:mt-0 text-white">
            <h2 className="text-center mb-2" id="h2">
              Newsletter
            </h2>
            <p>Join our active users and start receiving our daily updates</p>
            <form className="p-3">
              <div className="mb-3">
                <label>
                  Email <span className="text-red-500 font-bold">*</span>
                </label>
                <input
                  className="w-full rounded p-3"
                  type="email"
                  placeholder="your name"
                  style={{ background: "ghostWhite" }}
                />
              </div>
              <div>
                <button
                  className="w-full p-2 shadow shadow-lg"
                  type="submit"
                  style={{
                    background: "black",
                    borderRadius: "5px",
                    color: "white",
                  }}
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

            <a href="">
              <p className="/about">About</p>
            </a>
            <a href="">
              <p className="/contact">Contact</p>
            </a>
            <a href="">
              <p className="/vision">Vision</p>
            </a>
            <a href="">
              {" "}
              <p className="/mission">Mission</p>
            </a>

            <a href="">
              <p className="/properties">Sales</p>
            </a>
            <a href="">
              <p className="/properties">Rents</p>
            </a>

            <a href="">
              <p className="">Agents</p>
            </a>
          </div>
        </div>

        <div className="copy-right text-white">
          <p className="text-center p-3">
            Accomodation &copy; 2022. All rights reserved
          </p>
          <Scroll />
        </div>
      </section>
    </>
  );
}
