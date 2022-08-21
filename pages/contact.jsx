import { useEffect, useState } from "react";
import Head from "next/head";
import { toast } from "react-toastify";
import Header from "../components/Header2";
import { getAgents } from "../services/agents/api";

export async function getStaticProps() {
  const { data } = await getAgents;
  const agents = data;
  return {
    props: {
      agents: agents,
    },
  };
}

export default function Contact({ agents }) {
  console.log("contacts", agents);
  const [email, setEmail] = useState("");
  const [sender, setSender] = useState("");
  const [message, setMessage] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const contact = {
        email: email,
        sender: sender,
        message: message,
      };
      console.log(contact);
      setEmail("");
      setSender("");
      setMessage("");
      toast.success("Message sent");
    } catch (err) {
      console.log(err.message);
      toast.error("Oops! An error occurred");
    }
  }
  return (
    <>
      <Head>
        <title>Contact - Accommodation</title>
        <meta name="url" content="https://accomodation.vercel.app/contact" />
      </Head>

      <Header />
      <section className="container md:container mx-auto p-4 mt-10 text-white contact-section ">
        <h2 className="text-center" id="h2">
          Contact Us
        </h2>
        <p className="text-center">
          Use the contact form below to reach us anytime, anyday, we are always
          available to attend to your messages and concerns.
        </p>

        <form
          onSubmit={onSubmit}
          className="container md:container mx-auto contact-form my-4"
        >
          <div className=" grid grid-cols-2 gap-3">
            <div>
              <input
                className="w-full rounded-lg "
                type="text"
                placeholder="your name"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
              />
            </div>
            <div>
              <input
                className="w-full rounded-lg"
                type="email"
                placeholder="your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="">
            <textarea
              className="my-3 w-full rounded-lg"
              rows={5}
              placeholder="message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <div className="">
            <button
              className="w-full p-3 rounded-lg hover:text-black hover:bg-white"
              disabled={(email.length && sender.length && message.length) === 0}
              style={
                (email.length && sender.length && message.length) === 0
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
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
