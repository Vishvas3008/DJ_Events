import { FaSignInAlt,FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import styles from "../styles/Header.module.css";
import Seacrh from "./Seacrh";
// import LoginPage from "@/pages/account/login";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/" legacyBehavior>
          <a>DJ Events</a>
        </Link>
      </div>
      <Seacrh />
      <nav>
        <ul>
          <li>
            <Link href="/events" legacyBehavior>
              <a>Events</a>
            </Link>
          </li>
          <li>
            <Link href="/events/add" legacyBehavior>
              <a>Add Event</a>
            </Link>
          </li>
          <li>
            <Link href="/account/login" legacyBehavior>
              <a className="btn-secondary"><FaSignInAlt/> Log In</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
