import "@/styles/index.sass";
import { IBM_Plex_Sans } from "next/font/google";

const ibm = IBM_Plex_Sans({ weight: "400", subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <main className={ibm.className}>
      <Component {...pageProps} />
    </main>
  );
}
