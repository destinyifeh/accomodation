import React from "react";
import { Carousel } from "react-responsive-carousel";

const Info = () => {
  return (
    <React.Fragment>
      <div className="p-4 md:hidden">
        <h3 id="h3" className=" my-3">
          We connect our visitors who are in search for accomodation to rent or
          to buy to the appropriate agents
        </h3>

        <div className="mt-3">
          <p>
            <i className="fa fa-check p-2"></i>{" "}
            <span>More than 500 active agents</span>
          </p>
          <p>
            <i className="fa fa-check p-2"></i>{" "}
            <span>More than 2000 testimonies</span>
          </p>

          <p className="p-link mb-3 ml-4">
            <a
              className="font-bold contact-link rounded-lg "
              href="/properties"
            >
              Explore now
            </a>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Info;
