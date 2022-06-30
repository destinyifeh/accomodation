import { useState, useEffect } from "react";
import Header2 from "../../components/Header2";

export default function Add() {
  return (
    <>
      <Header2 />
      <h2 className="my-3 text-center" id="h2" style={{ color: "#e94b3cff" }}>
        Agent Dashboard
      </h2>
      <section className="grid md:grid-cols-2 ">
        <section className="mt-4 p-4 container md:container mx-auto add-form ">
          <h2 className="mb-3" id="h2" style={{ color: "#e94b3cff" }}>
            Add Property
          </h2>
          <form className="">
            <div className="my-2">
              <label>Title</label>
              <input className="w-full p-5 " type="text" />
            </div>
            <div className="my-2">
              <label>Location/Address</label>
              <input className="w-full p-5" type="text" />
            </div>
            <div className="my-2">
              <label>Price</label>
              <input className="w-full p-5" type="number" />
            </div>
            <div className="my-2">
              <label>Image</label>
              <input
                className="w-full p-5"
                type="file"
                style={{ background: "ghostWhite" }}
              />
            </div>
            <div className="">
              <label>Detail</label>
              <textarea className="w-full p-5" rows={5} />
            </div>
            <div className="my-2">
              <button
                className="w-full p-5 mb-6 bg-black text-white"
                type="submit"
                style={{ background: "#e94b3cff" }}
              >
                Submit
              </button>
            </div>
          </form>
          <div className="my-4 hidden lg:block">
            <p>&copy; Accomodation Agent Dashboard 2022. All rights reserved</p>
          </div>
        </section>

        <section className="mt-4 agent-dash ">
          <h2 className="text-center" id="h2">
            My Posts
          </h2>

          <div className="my-posts p-3">
            <h3 className="text-center mb-3" id="h3">
              Destiny destiny yes pooooooo ooooo
            </h3>
            <div className="grid grid-cols-3 text-center ">
              <p className="text-black font-bold">Delete</p>

              <a href="/">
                Edit <i className="fa fa-pencil"></i>{" "}
              </a>

              <p>(10) view</p>
            </div>
          </div>
          <hr />
        </section>
      </section>
    </>
  );
}
