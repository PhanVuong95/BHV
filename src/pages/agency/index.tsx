import React from "react";
import { Page, Spinner, Text } from "zmp-ui";
import LayoutHeader from "../../components/layouts/LayoutHeader";
import Navigation from "../../components/layouts/Navigation";
import UserCard from "../../components/views/home/UserCard";
import SettingRoute from "../../components/views/account/SettingRoute";
import useLoginPortal from "../../hooks/useLoginPortal";
import withLogin from "../../hooks/withLogin";
import FlexBox from "../../components/common/FlexBox";
import useRole from "../../hooks/useRole";

// Tô Bảo Tuân: 0943356236 - users_2d1e16e2-7f32-4bff-b133-4f1d8b8894d3 
// Lưu Văn Anh: 0982670555 - users_dab283d8-7186-45e7-ab09-1ae593cae98e
// Đào Minh Thắng: 0399699154 - users_6c4eee28-2af8-4bc8-af24-4d634f63f17e
// Phạm Thành Đạt: 0968573194 -
// Hoàng Điệp: 0336132952 -
// Vũ Đình Tú: 0984249234 - users_717db518-c9e6-4110-8cdb-ae3f8c0a5bee
//Danh sách user bị  ẩn tính năng thống kê
const AgencyPage: React.FunctionComponent = () => {
  const { userData } = useRole();
  const BLACK_LIST_USER: string[] = [
    'users_2e81e16a-21cb-4bb3-bce7-240c07047fca',
    'users_2d1e16e2-7f32-4bff-b133-4f1d8b8894d3',
    'users_dab283d8-7186-45e7-ab09-1ae593cae98e',
    'users_6c4eee28-2af8-4bc8-af24-4d634f63f17e',
    'users_717db518-c9e6-4110-8cdb-ae3f8c0a5bee',
    'users_fcc545a5-3a01-46bf-9528-70aad0796546',
    'users_7b03c850-af37-4d73-8a79-384e43a6b432',
    'users_4ba6896b-95c5-4e39-a8a8-67b30e29a07e',
    'users_459a62cc-b2f7-444e-89cb-ea6da7ecf2e7',
  ]
  const { handleOpenPortal, loading } = useLoginPortal();
  return (
    <Page className="page">
      <div className="body pb-24" style={{ background: "rgba(0,0,0,0.05)" }}>
        <LayoutHeader />
        <div className="bg-gradient pt-2">
          <UserCard />
        </div>

        <SettingRoute
          header="Cài đặt"
          items={[
            {
              label: "Giới thiệu người dùng",
              href: "/agency/share",
            },
            {
              label: "Mã giảm giá",
              href: "/agency/voucher",
              commingSoon: true,
            },
            {
              label: "Thông tin thanh toán",
              href: "/agency/payment",
              commingSoon: true,
            },
          ]}
        />
        {
          !BLACK_LIST_USER.includes(userData.id) && <SettingRoute
            header="Thống kê"
            items={[
              {
                label: "Báo cáo tổng quan",
                href: "/agency/report",
              },
            ]}
          />
        }


        <Text className="p-8 text-md text-gray-700 italic text-center bg-white mt-4">
          {loading && (
            <FlexBox className="justify-center">
              <Spinner />
            </FlexBox>
          )}
          Truy cập{" "}
          <span onClick={handleOpenPortal} className="text-blue-700">
            https://portal.baohiem.app
          </span>{" "}
          để sử dụng đầy đủ tính năng: xem báo cáo, yêu cầu mã giảm giá, rút
          tiền,...etc
        </Text>
      </div>

      <Navigation />
    </Page>
  );
};

export default withLogin(AgencyPage);
