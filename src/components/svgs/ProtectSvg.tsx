import * as React from "react";

export const ProtectSvg = (props) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M24 0H0v24h24V0Z" fill="#fff" />
    <path
      opacity={0.6}
      d="M16.36 18.49c-.01.01-.01.02-.01.02A20.414 20.414 0 0 1 12 22S3.16 17.58 2.1 7.08C5.21 17.15 12 10 12 10c6.76 2.9 4.52 8.14 4.36 8.49Z"
      fill="#2563EB"
    />
    <path
      opacity={0.4}
      d="M16.36 18.49c.16-.35 2.4-5.59-4.36-8.49-1-6 4.07-7.06 4.07-7.06l.59-.12h.01C18.41 3.23 20.2 3.92 22 5c0 0 0 7.5-5.64 13.49Z"
      fill="#2563EB"
    />
    <path
      d="m16.66 2.82-.59.12S11 4 12 10c0 0-6.79 7.15-9.9-2.92v-.01C2.04 6.41 2 5.71 2 5 2 5 8.72.97 16.66 2.82Z"
      fill="#2563EB"
    />
  </svg>
);
