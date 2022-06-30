import Image from "next/image";
import { Carousel } from "react-responsive-carousel";

const Ad = () => {
  return (
    <>
      {/* <Carousel
        autoPlay={true}
        showThumbs={false}
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        interval={6000}
        showArrows={false}
      > */}
      <section className="ad flex  mx-auto my-4 flex justify-even" style={{}}>
        <div className="">
          <p className="text-white">
            Are you looking for a property to buy or rent? Worry no more you can
            now get your affordable villa, apartments, offices, luxuries, and
            other properties right here
          </p>
          {/* <p className="text-white">
            
            with an agent now, because yes now, get it all for free{" "}
          </p> */}
          <button className="text-black p-2 block mx-auto mt-5 ad-btn">
            <span className="bbt">Explore all available properties now!</span>
          </button>
        </div>

        <div className="relative">
          <Image
            className="text-white"
            src="/images/ad3.png"
            alt=""
            width={350}
            height={310}
            quality={70}
            objectPosition="center"
          />
        </div>
      </section>
      {/* </Carousel> */}
    </>
  );
};

export default Ad;
