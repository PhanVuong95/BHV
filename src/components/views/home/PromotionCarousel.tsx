import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { Autoplay } from "swiper";
import { useNavigate } from "zmp-ui";
import { openUrlInWebview } from "../../../services/zalo";

type Props = {
  slidesPerView?: number;
  data: {
    image: string;
    href?: string;
    height?: number;
    content?: string;
  }[];
};

const fakeData = [
  {
    id: "26072fb9a0fc49a210eg",
    type: "normal",
    title: "Tại sao nên tái tục Hợp Đồng Bảo Hiểm NGAY HÔM NAY?",
    status: "show",
    total_view: 133,
    total_share: 2,
    create_date: 1702520484624,
    update_date: 1702520914667,
    thumb:
      "https://zalo-oa-article-photo.zedcdn.me/4b72734a781b9145c80a#339199619",
    link_view:
      "https://officialaccount.me/d?id=1252aa035f46b618ef57&pageId=1493565572267710607",
  },
  {
    id: "26072fb9a0fc49a210ed",
    type: "normal",
    title:
      "Bảo hiểm xã hội, bảo hiểm y tế hướng đến 2030 với 9 nhiệm vụ quan trọng",
    status: "show",
    total_view: 133,
    total_share: 2,
    create_date: 1702520484624,
    update_date: 1702520914667,
    thumb: "https://zalo-article-photo.zadn.vn/c0c9603c646b8d35d47a#305663252",
    link_view:
      "https://officialaccount.me/d/1493565572267710607?id=26072fb9a0fc49a210ed&pageId=1493565572267710607",
  },
  {
    id: "e6d5e4426a078359da16",
    type: "normal",
    title: "TẾT 2024 sẽ như thế nào ???",
    status: "show",
    total_view: 211,
    total_share: 2,
    create_date: 1701741484161,
    update_date: 1701741665102,
    thumb: "https://zalo-article-photo.zadn.vn/c7f23ab922eecbb092ff#304395093",
    link_view:
      "https://officialaccount.me/d/1493565572267710607?id=e6d5e4426a078359da16&pageId=1493565572267710607",
  },
];

const PromotionCarousel = ({ slidesPerView, data }: Props) => {
  return (
    <Swiper
      loop
      autoplay
      spaceBetween={20}
      slidesPerView={slidesPerView || 2}
      modules={[Autoplay]}
    >
      {fakeData.map((data) => (
        <SwiperSlide key={data.id}>
          <div
            style={{ maxWidth: "184px" }}
            onClick={() => {
              openUrlInWebview(data.link_view);
            }}
          >
            <img
              src={data.thumb}
              style={{
                height: "83px",
                width: "184px",
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
              }}
            />
            <div
              style={{
                padding: "12px",
                background: "white",
                boxShadow: "0px 2px 6px 0px #0000000A",
                borderRadius: "0px 0px 8px 8px",
              }}
            >
              <div
                style={{
                  color: "#2E2E2E",
                  fontSize: "12px",
                  minHeight: "54px",
                }}
              >
                {data.title}
              </div>
              <div
                className="d-flex"
                style={{
                  alignItems: "center",
                  marginTop: "12px",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{ fontSize: "12px", fontWeight: 600 }}
                  className="text-primary-color"
                >
                  Xem chi tiết
                </div>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    y="-0.00256348"
                    width="16"
                    height="16"
                    rx="8"
                    fill="#0544E8"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.97978 11.0177C6.78452 10.8224 6.78452 10.5058 6.97978 10.3106L9.29289 7.99746L6.97978 5.68434C6.78452 5.48908 6.78452 5.1725 6.97978 4.97724C7.17504 4.78197 7.49162 4.78197 7.68689 4.97724L10.3064 7.59676C10.5277 7.81806 10.5277 8.17685 10.3064 8.39815L7.68689 11.0177C7.49162 11.2129 7.17504 11.2129 6.97978 11.0177Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default PromotionCarousel;
