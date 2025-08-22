import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./Layput";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Load Bootstrap JavaScript only on client side
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
