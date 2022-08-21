import Head from "next/head";
import Header from "../components/Header2";
export default function Vision() {
  return (
    <>
      <Head>
        <title>Vision - Accommodation</title>
        <meta name="url" content="https://accomodation.vercel.app/vision" />
      </Head>

      <Header />
      <section className="container md:container mx-auto my-4 p-3">
        <h2 className="" id="h2">
          Our Vision
        </h2>
        <p>
          To ensure members of the public who are in search of accomodation
          easily get connectd and access to hundred of agents.
        </p>
      </section>
    </>
  );
}
