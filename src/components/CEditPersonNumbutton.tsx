import React from "react";
interface ICEditPersonNumbutton {
  insuranceData: any;
  seteditPersonNum: React.Dispatch<React.SetStateAction<number>>;
}
const CEditPersonNumbutton = ({
  insuranceData,
  seteditPersonNum,
}: ICEditPersonNumbutton) => {
  return (
    <div>
      {insuranceData.attachedList.map((item, index) => (
        <div
          onClick={() => {
            seteditPersonNum(index + 1);
          }}
          className="text-primary-color mt-4"
          style={{
            height: "48px",
            lineHeight: "48px",
            border: "1px dashed #DEE7FE",
            fontSize: "16px",
            fontWeight: 600,
            textAlign: "center",
            borderStyle: "dashed",
            boxShadow: "0px 2px 20px 0px #0000001A",
          }}
        >
          <div
            className="d-flex"
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <div>Người nhận bảo hiểm {index + 1} (*)</div>
            <div>
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.7112 3.83764C17.6151 2.93368 19.0807 2.93368 19.9847 3.83764C20.8887 4.7416 20.8887 6.20721 19.9847 7.11117L9.15136 17.9445L5.16046 19.5249C4.61896 19.7393 4.08299 19.2034 4.29742 18.6619L5.87783 14.671L16.7112 3.83764ZM19.1858 4.63658C18.723 4.17387 17.9728 4.17387 17.5101 4.63658L6.8422 15.3045L5.74359 18.0787L8.51784 16.9801L19.1858 6.31222C19.6485 5.84951 19.6485 5.0993 19.1858 4.63658ZM10.9346 19.1074C10.9346 18.7954 11.1875 18.5425 11.4996 18.5425L19.4987 18.5425C19.8107 18.5425 20.0636 18.7954 20.0636 19.1074C20.0636 19.4195 19.8107 19.6724 19.4987 19.6724H11.4996C11.1875 19.6724 10.9346 19.4195 10.9346 19.1074Z"
                  fill="#0544E8"
                />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CEditPersonNumbutton;
