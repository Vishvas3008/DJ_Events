import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import styles from "../styles/Header.module.css";
import Seacrh from "./Seacrh";
// import LoginPage from "@/pages/account/login";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";

export default function Header() {
  const { login, user, logout } = useContext(AuthContext);

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
          {user ? (
            <>
              <li>
                <Link href="/events/add" legacyBehavior>
                  <a>Add Event</a>
                </Link>
              </li>
              <li>
                <Link href="/account/dashboard" legacyBehavior>
                  <a>Dashboard</a>
                </Link>
              </li>
              <li>
                <button className="btn-secondary" onClick={() => logout()}>
                  <FaSignOutAlt /> Log Out
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link href="/account/login" legacyBehavior>
                <a className="btn-secondary">
                  <FaSignInAlt /> Log In
                </a>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
