import React, { useState, useEffect } from "react";
import { setState } from "../operations/mutation";
import { readState } from "../operations/query";
import { useQuery } from "@apollo/client";

import dynamic from "next/dynamic";
const PDFViewer = dynamic(() => import("../components/Pdf-viewer"), {
  ssr: false,
});

export default function resume() {
  const {
    data: {
      readState: { showSpinner },
    },
  } = useQuery(readState("showSpinner"));

  useEffect(() => {
    if (!showSpinner) {
      setState({ showSpinner: true });
    }
  }, []);

  return (
    <div className="overflow-hidden pt-56 sm:pt-48 py-3 flex min-h-screen bg-gradient-to-br from-green-300 via-blue-500 to-purple-600 items-center justify-center content-center">
      <PDFViewer />;
    </div>
  );
}
