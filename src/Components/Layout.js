import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "./Footer";
import Header from "./Header";
import Showcase from "./Showcase";
export default function Layout({ title, keyword, description, children }) {
  const router = useRouter();
//   console.log(router);
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="key" content={keyword} />
      </Head>
      <Header />
      {router.pathname === "/" && <Showcase />}
      {children}
      <Footer></Footer>
    </div>
  );
}
Layout.defaultProps = {
  title: "Dj Events",
  description: "Find The Latest DJ Party",
  keyword: "music,dj,edm",
};
