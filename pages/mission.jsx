import Head from "next/head";
import Header from "../components/Header2";
export default function Mission() {
  return (
    <>
      <Head>
        <title>Mission - Accomodation</title>
        <meta name="url" content="http://localhost:3000/mission" />
      </Head>
      <Header />
      <section className="container md:container mx-auto my-4 p-3">
        <h2 className="" id="h2">
          Our Mission
        </h2>
        <p>
          To ensure we conect our visitors / members of the public who are in
          search for accomodation to rent or properties to buy to the
          appropriate agents.
        </p>
      </section>
    </>
  );
}
