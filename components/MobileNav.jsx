import Link from "next/link";

import styles from "../styles/components.module.css";

const MobileNav = () => {
  return (
    <>
      <div className=" " id={styles.mobile}>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/mission">Mission</Link>
        <Link href="/vision">Vision</Link>
        <Link href="/properties" className="">
          Properties
        </Link>
      </div>
    </>
  );
};

export default MobileNav;
