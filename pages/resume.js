import React, { useEffect } from "react";
import { setState } from "../operations/mutation";
import { readState } from "../operations/query";
import { useQuery } from "@apollo/client";
import Head from "next/head";

import dynamic from "next/dynamic";
const PDFViewer = dynamic(() => import("../components/Pdf-viewer"), {
  ssr: false,
});

export default function resume() {
  const {
    data: {
      readState: { showSpinner, navbarOpen },
    },
  } = useQuery(readState("showSpinner, navbarOpen"));

  useEffect(() => {
    if (!showSpinner) {
      setState({ showSpinner: true });
    }
  }, []);

  return (
    <div
      className={`overflow-hidden ${
        navbarOpen ? "pt-60" : "pt-36"
      } sm:pt-44 py-3 pb-20 flex min-h-screen bg-gradient-to-br from-green-300 via-blue-500 to-purple-600 items-center justify-center content-center`}
    >
      <Head>
        <title>Resume</title>
        <meta
          name="description"
          content="Resume page of the portfolio website developed by John Cervantes."
        />
      </Head>
      <PDFViewer />;
    </div>
  );
}
