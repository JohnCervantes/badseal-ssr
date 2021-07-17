import React, {useState} from 'react'

import dynamic from "next/dynamic";
const PDFViewer = dynamic(() => import("../components/Pdf-viewer"), {
    ssr: false
  });

export default function resume() {

    return (
        <div className="flex py-5 min-h-screen bg-gradient-to-br from-green-300 via-blue-500 to-purple-600 items-center justify-center content-center bg-red-300 h-auto"> 
            <PDFViewer />;
        </div>
    )
}
