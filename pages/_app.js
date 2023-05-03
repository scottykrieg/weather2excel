import { useState } from "react";
import Head from "next/head";
import "@/styles/index.sass";
import ModeToggle from "@/components/ModeToggle";

function MyApp({ Component, pageProps }) {
  const [mode, setMode] = useState("light");

  const handleModeToggle = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    document.documentElement.setAttribute("data-theme", newMode);
  };

  return (
    <>
      <Head>
        <title>My App</title>
      </Head>
      <body
        className={`font-ibm-plex-sans ${mode === "light" ? "light" : "dark"}`}
      >
        <ModeToggle mode={mode} handleModeToggle={handleModeToggle} />
        <div>
          <Component {...pageProps} />
        </div>
      </body>
    </>
  );
}

export default MyApp;
