import Link from "next/link";
import Layout from "@/Components/Layout";

export default function AboutPage() {
  return (
    <Layout>
      <h3>About this Page</h3>
      <h5>THis is a project</h5>
      <Link href={"/"} style={{ textDecoration: "none" }}>
        Home
      </Link>
    </Layout>
  );
}
