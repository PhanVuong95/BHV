import React, { useMemo, useState } from "react";
import { getCertPath, getOrigin } from "../../helpers/s3";
import FlexBox from "./FlexBox";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

type Props = {
  src: string;
  transactionId: string;
  maxHeight?: string | number;
};

const InsuranceBHXHPdf = ({ src, transactionId, maxHeight }: Props) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const [scale, setscale] = useState(1);
  const certPath = useMemo(
    () => getOrigin(getCertPath(`${transactionId}.pdf`)),
    [transactionId]
  );
  return (
    <div>
      <FlexBox
        className="justify-center"
        style={{
          zIndex: 1000,
        }}
      >
        <button
          className="border rounded p-1 pl-2 pr-2 bg-white m-2 shadow"
          onClick={() => {
            setscale(scale * 2);
          }}
        >
          +
        </button>
        <button
          className="border rounded p-1  pl-2 pr-2 bg-white m-2  shadow"
          onClick={() => {
            setscale(scale / 2);
          }}
        >
          -
        </button>
      </FlexBox>
      <div className="overflow-auto w-full relative" style={{ maxHeight }}>
        <div>
          <Document
            onLoadError={console.error}
            file={certPath}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            {Array.apply(null, Array(numPages))
              .map((x, i) => i + 1)
              .map((page) => (
                <Page
                  pageNumber={page}
                  scale={scale}
                  width={window.innerWidth}
                />
              ))}
          </Document>
        </div>
      </div>
    </div>
  );
};

export default InsuranceBHXHPdf;
