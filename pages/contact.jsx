import Head from "next/head";
import Header from "../components/Header2";
export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact - Accomodation</title>
        <meta name="url" content="http://localhost:3000/contact" />
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

        <form className="container md:container mx-auto contact-form my-4">
          <div className=" grid grid-cols-2 gap-3">
            <div>
              <input
                className="w-full rounded-lg "
                type="text"
                placeholder="your name"
              />
            </div>
            <div>
              <input
                className="w-full rounded-lg"
                type="email"
                placeholder="your email"
              />
            </div>
          </div>
          <div className="">
            <textarea
              className="my-3 w-full rounded-lg"
              rows={5}
              placeholder="message..."
            ></textarea>
          </div>
          <div className="">
            <button className="w-full p-3 text-white rounded-lg bg-black hover:text-black hover:bg-white">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
