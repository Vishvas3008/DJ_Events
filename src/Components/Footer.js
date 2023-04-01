import Link from "next/link";
import styles from "../styles/Footer.module.css";
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; Vishvas</p>
      <p>
        <Link href="/about" legacyBehavior>
          <a>About This Page</a>
        </Link>
      </p>
    </footer>
  );
}
