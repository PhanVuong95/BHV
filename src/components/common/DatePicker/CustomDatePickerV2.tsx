import { DatePicker, Form } from "antd";
import React, { useRef, useState } from "react";
import dayjs from "dayjs";
import moment from "moment";

const CustomDatePickerV2 = (props) => {
  const { label, value, onChange, disabled, disabledDate } = props;
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const ref = useRef<any>(null);
  const labelClass =
    isDatePickerVisible || value ? "label label-float" : "label";
  const dateFormat = "DD/MM/YYYY";
  let date = new Date(value);
  let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  let month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1; // Tháng bắt đầu từ 0 nên cần cộng thêm 1
  let year = date.getFullYear();
  let formattedDate = `${day}/${month}/${year}`;
  //
  return (
    <div
      onClick={() => {
        if (!disabled) {
          setDatePickerVisible(true);
        }
      }}
      className="float-label"
      style={{ position: "relative" }}
    >
      {isDatePickerVisible && (
        <div className={`custom-date-picker-overlay`}></div>
      )}
      <DatePicker
        showToday={false}
        onChange={(e, e1) => {
          if (onChange) {
            onChange(e, e1);
          }
        }}
        ref={ref}
        // disabled={true}
        className="custom-date-picker-v2"
        open={isDatePickerVisible}
        onOpenChange={(open) => setDatePickerVisible(open)}
        format={dateFormat}
        // style={{ width: "100%" }}
        style={{ visibility: "hidden", width: 0, position: "absolute" }}
        disabledDate={disabledDate}
      />
      <div
        style={{
          borderRadius: "8px",
          paddingLeft: "11px",
          paddingBottom: "4px",
          paddingTop: "23px",
        }}
        id={`custom-input-height-56${disabled ? " disabled" : ""}`}
        className="height-56-px"
      >
        {/* {moment(value)?.format("DD/MM/YYYY")} */}
        {formattedDate}
      </div>
      <label className={labelClass}>{label}</label>
      <svg
        style={{ right: "12px" }}
        className="custom-icon-right"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.75244 2.0013C8.75244 1.58708 8.41666 1.2513 8.00244 1.2513C7.58823 1.2513 7.25244 1.58708 7.25244 2.0013V2.78155C5.71653 2.90938 4.49864 3.44164 3.64035 4.36596C2.65608 5.42594 2.25244 6.88633 2.25244 8.5013V17.0013C2.25244 18.6163 2.65608 20.0767 3.64035 21.1366C4.63396 22.2067 6.10949 22.7513 8.00244 22.7513H16.0024C17.8954 22.7513 19.3709 22.2067 20.3645 21.1366C21.3488 20.0767 21.7524 18.6163 21.7524 17.0013V8.5013C21.7524 6.88633 21.3488 5.42594 20.3645 4.36596C19.5062 3.44164 18.2884 2.90938 16.7524 2.78155V2.0013C16.7524 1.58708 16.4167 1.2513 16.0024 1.2513C15.5882 1.2513 15.2524 1.58708 15.2524 2.0013V2.7513H8.75244V2.0013ZM7.25244 4.28758V5.0013C7.25244 5.41551 7.58823 5.7513 8.00244 5.7513C8.41666 5.7513 8.75244 5.41551 8.75244 5.0013V4.2513H15.2524V5.0013C15.2524 5.41551 15.5882 5.7513 16.0024 5.7513C16.4167 5.7513 16.7524 5.41551 16.7524 5.0013V4.28758C17.9374 4.40797 18.7383 4.81907 19.2653 5.38664C19.8812 6.04981 20.2251 7.03593 20.2509 8.34126H3.75401C3.77983 7.03593 4.12373 6.04981 4.73954 5.38664C5.26656 4.81907 6.06746 4.40797 7.25244 4.28758ZM3.75244 9.84126V17.0013C3.75244 18.3863 4.09881 19.4259 4.73954 20.116C5.37092 20.7959 6.39539 21.2513 8.00244 21.2513H16.0024C17.6095 21.2513 18.634 20.7959 19.2653 20.116C19.9061 19.4259 20.2524 18.3863 20.2524 17.0013V9.84126H3.75244ZM14.6971 13.7013C14.6971 13.149 15.1449 12.7013 15.6971 12.7013H15.7061C16.2584 12.7013 16.7061 13.149 16.7061 13.7013C16.7061 14.2536 16.2584 14.7013 15.7061 14.7013H15.6971C15.1449 14.7013 14.6971 14.2536 14.6971 13.7013ZM15.6971 15.7013C15.1449 15.7013 14.6971 16.149 14.6971 16.7013C14.6971 17.2536 15.1449 17.7013 15.6971 17.7013H15.7061C16.2584 17.7013 16.7061 17.2536 16.7061 16.7013C16.7061 16.149 16.2584 15.7013 15.7061 15.7013H15.6971ZM10.9979 13.7013C10.9979 13.149 11.4456 12.7013 11.9979 12.7013H12.0069C12.5592 12.7013 13.0069 13.149 13.0069 13.7013C13.0069 14.2536 12.5592 14.7013 12.0069 14.7013H11.9979C11.4456 14.7013 10.9979 14.2536 10.9979 13.7013ZM11.9979 15.7013C11.4456 15.7013 10.9979 16.149 10.9979 16.7013C10.9979 17.2536 11.4456 17.7013 11.9979 17.7013H12.0069C12.5592 17.7013 13.0069 17.2536 13.0069 16.7013C13.0069 16.149 12.5592 15.7013 12.0069 15.7013H11.9979ZM7.29675 13.7013C7.29675 13.149 7.74447 12.7013 8.29675 12.7013H8.30574C8.85802 12.7013 9.30574 13.149 9.30574 13.7013C9.30574 14.2536 8.85802 14.7013 8.30574 14.7013H8.29675C7.74447 14.7013 7.29675 14.2536 7.29675 13.7013ZM8.29675 15.7013C7.74447 15.7013 7.29675 16.149 7.29675 16.7013C7.29675 17.2536 7.74447 17.7013 8.29675 17.7013H8.30574C8.85802 17.7013 9.30574 17.2536 9.30574 16.7013C9.30574 16.149 8.85802 15.7013 8.30574 15.7013H8.29675Z"
          fill="#0544E8"
        />
      </svg>
    </div>
  );
};

export default CustomDatePickerV2;
