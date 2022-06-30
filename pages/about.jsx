import Head from "next/head";
import Header from "./../components/Header2";
export default function About() {
  return (
    <>
      <Head>
        <title>About - Accomodation</title>
        <meta name="url" content="http://localhost:3000/about" />
      </Head>
      <Header />
      <section className="container md:container mx-auto my-4 p-3">
        <h2 className="" id="h2">
          About Us
        </h2>
        <p>
          We connect our visitors who are in search for accomodation to rent or
          properties to buy to the appropriate agents.
        </p>
      </section>
    </>
  );
}
