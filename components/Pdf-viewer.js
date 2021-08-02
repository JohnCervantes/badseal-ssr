import { useState } from "react";
// import default react-pdf entry
import { Document, Page, pdfjs } from "react-pdf";
import { setState } from "../operations/mutation";
// import pdf worker as a url, see `next.config.js` and `pdf-worker.js`
//import workerSrc from "../pdf-worker";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
export default function PDFViewer() {

  function onDocumentLoadSuccess() {
    setState({ showSpinner: false });
  }

  return (
    <Document
      file="/resume.pdf"
      loading=""
      onLoadSuccess={onDocumentLoadSuccess}
    >
      <Page pageNumber={1} />
    </Document>
  );
}
