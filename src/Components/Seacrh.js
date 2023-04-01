import styles from "../styles/Search.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
export default function Seacrh() {
  const [term, setTerm] = useState("");
  const router = useRouter();
//   console.log(router.pathname);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (router.pathname === "/events/search") {
      router.push(`${router.pathname}?term=${term}`);
    } else {
      router.push(`${router.pathname}/search?term=${term}`);
    }
    setTerm("");
  };
  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search Events"
        ></input>
      </form>
    </div>
  );
}
