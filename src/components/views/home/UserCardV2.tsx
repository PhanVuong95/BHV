import React from "react";
import { useRecoilValue } from "recoil";
import { Text } from "zmp-ui";
import useOA from "../../../hooks/useOA";
import { userState } from "../../../state";
import FlexBox from "../../common/FlexBox";
import SupportSvg from "../../svgs/SupportSvg";
import copy from "copy-to-clipboard";
import { useToasts } from "react-toast-notifications";

const UserCardV2 = ({ iconMsg = false, showUserId = false }) => {
  const user = useRecoilValue(userState);
  const { openChat } = useOA();
  const { addToast } = useToasts();
  return (
    <div className="w-full">
      <FlexBox
        className="justify-between items-center bg-white p-4"
        style={{
          borderRadius: 12,
          boxShadow: "0px 2px 20px 0px #0000001A",
        }}
      >
        <FlexBox>
          <img
            src={
              user.avatar ||
              "https://t4.ftcdn.net/jpg/04/08/24/43/360_F_408244382_Ex6k7k8XYzTbiXLNJgIL8gssebpLLBZQ.jpg"
            }
            className="bg-gray-300 "
            style={{
              objectFit: "contain",
              borderRadius: "100%",
              width: 40,
              height: 40,
            }}
          />
          <div className="pl-4">
            <Text.Title className="fs-14 text-seconds-color fw-600">
              Xin chào, {user.name}
            </Text.Title>
            {showUserId && (
              <Text.Title
                className="fs-14 text-seconds-color fw-600"
                style={{ position: "relative" }}
              >
                Id: {user.id}{" "}
                <img
                  onClick={() => {
                    copy(user.id);
                    addToast("Đã copy", {
                      appearance: "success",
                      autoDismiss: true,
                    });
                  }}
                  style={{ position: "absolute", right: "0px", bottom: "0px" }}
                  width={16}
                  height={16}
                  src={`https://uxwing.com/wp-content/themes/uxwing/download/file-and-folder-type/copy-link-icon.png`}
                />
              </Text.Title>
            )}

            <Text className="fs-12 text-thir-color">{user.phone}</Text>
          </div>
        </FlexBox>
        <FlexBox
          className="flex-col items-center"
          onClick={() => openChat("Tôi cần hỗ trợ")}
        >
          <div className="p-1">
            {iconMsg ? (
              <svg
                width="20"
                height="17"
                viewBox="0 0 20 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.87685 8.99902C6.49811 8.99902 7.00173 8.4954 7.00173 7.87415C7.00173 7.25289 6.49811 6.74927 5.87685 6.74927C5.2556 6.74927 4.75198 7.25289 4.75198 7.87415C4.75198 8.4954 5.2556 8.99902 5.87685 8.99902Z"
                  fill="#0544E8"
                />
                <path
                  d="M10.7513 7.87415C10.7513 8.4954 10.2477 8.99902 9.62645 8.99902C9.00519 8.99902 8.50157 8.4954 8.50157 7.87415C8.50157 7.25289 9.00519 6.74927 9.62645 6.74927C10.2477 6.74927 10.7513 7.25289 10.7513 7.87415Z"
                  fill="#0544E8"
                />
                <path
                  d="M13.376 8.99902C13.9973 8.99902 14.5009 8.4954 14.5009 7.87415C14.5009 7.25289 13.9973 6.74927 13.376 6.74927C12.7548 6.74927 12.2512 7.25289 12.2512 7.87415C12.2512 8.4954 12.7548 8.99902 13.376 8.99902Z"
                  fill="#0544E8"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.75198 0.187477C2.3705 0.187477 0.439941 2.11804 0.439941 4.49951V10.3934C0.439941 12.758 2.34426 14.6815 4.70875 14.7052L13.951 14.7979C14.6638 14.805 15.3535 15.0509 15.9101 15.4961L17.4307 16.7126C18.29 17.4 19.5629 16.7883 19.5629 15.6878V4.49951C19.5629 2.11804 17.6323 0.187477 15.2508 0.187477H4.75198ZM1.56482 4.49951C1.56482 2.7393 2.99176 1.31236 4.75198 1.31236H15.2508C17.0111 1.31236 18.438 2.73929 18.438 4.49951V15.6878C18.438 15.845 18.2562 15.9324 18.1334 15.8342L16.6128 14.6178C15.8598 14.0154 14.9266 13.6827 13.9623 13.6731L4.72002 13.5804C2.97236 13.5629 1.56482 12.1412 1.56482 10.3934V4.49951Z"
                  fill="#0544E8"
                />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.5"
                  y="0.5"
                  width="23"
                  height="23"
                  rx="11.5"
                  stroke="#0544E8"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.71443 6.79159C7.46968 6.79159 7.23495 6.88882 7.06189 7.06189C6.89143 7.23234 6.79454 7.46262 6.79166 7.70337C6.94496 10.1739 7.9955 12.5035 9.746 14.254C11.4965 16.0045 13.8261 17.055 16.2966 17.2083C16.5374 17.2055 16.7677 17.1086 16.9381 16.9381C17.1112 16.765 17.2084 16.5303 17.2084 16.2856V14.6221C17.2084 14.2021 16.9472 13.8263 16.5535 13.6799L15.343 13.2298C14.8892 13.0611 14.3797 13.2398 14.1306 13.6549L13.7404 14.3052C13.6345 14.4818 13.4107 14.5477 13.226 14.4565C11.712 13.7099 10.286 12.2384 9.54345 10.7328C9.45234 10.5481 9.51816 10.3243 9.69479 10.2183L10.3408 9.83073C10.7573 9.58085 10.9355 9.06895 10.7644 8.61443L10.323 7.44254C10.1755 7.05089 9.80076 6.79159 9.38225 6.79159H7.71443ZM6.50215 6.50215C6.82366 6.18063 7.25974 6 7.71443 6H9.38225C10.1303 6 10.8001 6.46347 11.0638 7.16354L11.5052 8.33543C11.8111 9.14786 11.4925 10.0629 10.7481 10.5095L10.4238 10.7041C11.0685 11.8408 12.1291 12.9285 13.2552 13.5753L13.4519 13.2476C13.897 12.5056 14.8078 12.1863 15.6188 12.4879L16.8293 12.9379C17.5331 13.1996 18 13.8713 18 14.6221V16.2856C18 16.7403 17.8194 17.1763 17.4979 17.4979C17.1763 17.8194 16.7403 18 16.2856 18C16.2776 18 16.2696 17.9998 16.2616 17.9993C13.5932 17.8371 11.0765 16.704 9.18626 14.8137C7.29599 12.9235 6.16288 10.4068 6.00073 7.73844C6.00024 7.73045 6 7.72244 6 7.71443C6 7.25974 6.18063 6.82366 6.50215 6.50215Z"
                  fill="#0544E8"
                />
              </svg>
            )}
          </div>
          <Text className="text-xs text-white font-semibold">Hỗ trợ</Text>
        </FlexBox>
      </FlexBox>
    </div>
  );
};

export default UserCardV2;
