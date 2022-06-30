import { useState, useEffect } from "react";

const Scroll = () => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setScroll("scroll", true);
        console.log(scroll);
      } else {
        setScroll(false);
        //console.log("false", scroll);
      }
    });
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <p
        className="p-3"
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          color: "#e94b3cff",
          fontSize: "1.8em",
          fontWeight: "bolder",
          cursor: "pointer",
        }}
        onClick={scrollTop}
      >
        {scroll ? <i className="fa fa-arrow-circle-up"></i> : ""}
      </p>
    </>
  );
};

export default Scroll;
