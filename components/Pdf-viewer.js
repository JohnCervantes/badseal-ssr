import { useState } from "react";
// import default react-pdf entry
import { Document, Page, pdfjs } from "react-pdf";
// import pdf worker as a url, see `next.config.js` and `pdf-worker.js`
//import workerSrc from "../pdf-worker";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
export default function PDFViewer() {
  const [file, setFile] = useState("/resume.pdf");
  const [numPages, setNumPages] = useState(null);


  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  return (
      <Document file="/resume.pdf" onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={numPages} width={485}/>
      </Document>
  );
}
