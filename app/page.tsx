import type { Metadata } from "next";
import { Counter } from "./components/counter/Counter";
import Image from "next/image";
import "./styles/globals.css";
import styles from "./styles/layout.module.css";


export default function IndexPage() {
  return(<>
    <header className={styles.header}>
      <Image
        src="/logo.svg"
        className={styles.logo}
        alt="logo"
        width={100}
        height={100}
      />
    </header> <Counter /></>);
}

export const metadata: Metadata = {
  title: "Redux Toolkit",
};
