import Image from "next/image";
import Link from "next/link";
import { Carousel } from "react-responsive-carousel";

const Ad2 = () => {
  return (
    <>
      <section className="ad2 mt-8 relative ">
        <div
          className="text-white"
          style={{ position: "absolute", top: "8em", zIndex: 1 }}
        >
          <p>Lets connect you</p>
          <p>Are you ready?</p>
          <Link href="/">
            <p className="meet">Meet an agent</p>
          </Link>
        </div>
        <div className="">
          <p className="text-white">
            This is the right place to be. Over 200 active agents are waiting
            for you
          </p>
        </div>

        <div className="container md:container mx-auto ">
          <Image
            src="/images/ad4.png"
            alt=""
            quality={70}
            // layout="fill"
            // objectFit="cover"
            height={289}
            width={200}
          />
        </div>
      </section>

      {/* <section className="ad2 bg-yellow-300 container mx-auto my-10 grid grid-cols-2 flex justify-even">
          <div className="">
            <p className="text-white">
              Get your affordable apartment right here on accomodation. Connect
              with an agent now, be{" "}
            </p>
          </div>
          <div className="">
            <Image
              className="text-white"
              src="/images/new2.png"
              alt=""
              width={70}
              height={70}
            />
          </div>
        </section>
      </Carousel> */}
    </>
  );
};

export default Ad2;
