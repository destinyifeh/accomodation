import React, { useState, useEffect } from "react";
import Image from "next/image";
import Head from "next/head";
import Header from "../components/Header2";
import user from "../public/images/staff1.jpg";
import { getAgents } from "../services/agents/api";
import { getTheTime } from "../utils/formatters";
export default function Agents({ agents }) {
  console.log(agents, "ll agents");

  return (
    <>
      <Head>
        <title>Registered Agents - Accommodation</title>
        <meta name="url" content="https://accomodation.vercel.app/agents" />
      </Head>
      <Header />
      <section className="all-agents ">
        <h2 className=" font-bold text-center my-3" id="h2">
          Registered Agents{" "}
        </h2>
        <div className="p-2 grid grid-cols-3 gap-3">
          {agents?.map((agent, idx) => {
            return (
              <>
                <div className="agents-card mt-3 text-center " key={idx}>
                  <span className="flex justify-center">
                    <Image
                      className="agent-pic "
                      width={50}
                      height={50}
                      alt="agent pic"
                      src={agent.picture}
                    />
                  </span>
                  <h3
                    className="font-bold mt-3"
                    id="h3"
                    style={{ textTransform: "capitalize" }}
                  >
                    <a href={`/agent/${agent._id}`}>
                      {" "}
                      {agent.firstName} {agent.lastName}
                    </a>
                  </h3>
                  <h4 className=" text-blue-700" id="h4">
                    <a
                      target="_blank"
                      rel="noreferrer noopener"
                      href={`mailto:${
                        agent.email
                      }?subject=${`Message coming from accomodation website`}`}
                    >
                      {" "}
                      Contact this agent
                    </a>
                  </h4>
                  <p className="">Registered date</p>
                  <p className="mb-3" style={{ color: "#e94b3cff" }}>
                    {" "}
                    {getTheTime(agent.createdAt)}
                  </p>
                  <span className="stars text-blue-700 ">
                    Verified<i className="fa fa-check "></i>
                  </span>
                </div>
              </>
            );
          })}
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const { data } = await getAgents;
  const agents = data;
  return {
    props: {
      agents: agents,
    },
  };
}
