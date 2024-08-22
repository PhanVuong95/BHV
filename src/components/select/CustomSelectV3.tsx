import { Modal } from "antd";
import React, { useState } from "react";
const CustomSelectV3 = (props) => {
  const { label, value, onChange, options = [] } = props;
  const findValueInOptions = [...options].find(
    (itemFind) => itemFind?.Value === value
  );
  const [showModal, setShowModal] = useState(false);
  const labelClass =
    showModal || findValueInOptions ? "label label-float" : "label";
  const handleOk = () => {
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };
  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="float-label"
        style={{ position: "relative" }}
      >
        <div
          style={{
            borderRadius: "8px",
            paddingLeft: "11px",
            paddingBottom: "4px",
            paddingTop: "23px",
          }}
          id="custom-input-height-56"
          className="height-56-px "
        >
          {findValueInOptions?.Text?.length > 40
            ? findValueInOptions?.Text?.substring(0, 40) + "..."
            : findValueInOptions?.Text}
        </div>
        <label className={labelClass}>{label}</label>
        <svg
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
            d="M12.7082 14.7068C12.3177 15.0973 11.6846 15.0973 11.2941 14.7068L6.29465 9.70736C5.90417 9.31688 5.90417 8.68378 6.29465 8.2933C6.68513 7.90282 7.31823 7.90282 7.70871 8.2933L12.0011 12.5857L16.2936 8.2933C16.684 7.90282 17.3171 7.90282 17.7076 8.2933C18.0981 8.68378 18.0981 9.31688 17.7076 9.70736L12.7082 14.7068Z"
            fill="#0544E8"
          />
        </svg>
        <div style={{ color: "var(--primary-color-err)" }}>
          {props?.errorText}
        </div>
      </div>
      <Modal
        closable={false}
        title={
          <div
            className="text-primary-color"
            style={{ textAlign: "center", fontSize: "16px", fontWeight: 500 }}
          >
            {label}
          </div>
        }
        className="custom-modal-antd-bottom"
        open={showModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        style={{
          bottom: 0,
          top: "auto",
          position: "fixed",
          left: 0,
          right: 0,
          width: "100%",
        }}
      >
        {options?.map((itemMap, key, arr) => (
          <>
            <div
              onClick={() => {
                onChange(itemMap);
                handleCancel();
              }}
              style={{ padding: "16px 0px", position: "relative" }}
              className="custom-select-v2-item"
            >
              {itemMap?.Text}
              {itemMap?.Value === findValueInOptions?.Value && (
                <svg
                  className="custom-icon-right"
                  style={{ right: "0px" }}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="16" height="16" rx="8" fill="#30BB1A" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.6034 5.73725C11.7486 5.88619 11.7456 6.12466 11.5967 6.26989L7.58664 10.1798C7.38959 10.3719 7.07563 10.373 6.8772 10.1823L5.07269 8.44798C4.9227 8.30383 4.91797 8.06539 5.06213 7.9154C5.20628 7.76542 5.44473 7.76069 5.59471 7.90484L7.22939 9.47596L11.0707 5.73051C11.2197 5.58529 11.4582 5.5883 11.6034 5.73725Z"
                    fill="white"
                  />
                </svg>
              )}
            </div>
            {arr.length - 1 === key ? "" : <hr />}
          </>
        ))}
      </Modal>
    </>
  );
};

export default CustomSelectV3;
