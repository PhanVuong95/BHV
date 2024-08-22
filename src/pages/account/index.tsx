import React from "react";
import { Button, Icon, Page } from "zmp-ui";
import FlexBox from "../../components/common/FlexBox";
import Tag from "../../components/common/Tag";
import LayoutHeader from "../../components/layouts/LayoutHeader";
import Navigation from "../../components/layouts/Navigation";
import SettingRoute from "../../components/views/account/SettingRoute";
import UserCard from "../../components/views/home/UserCard";
import { ETagType } from "../../enums";
import useOA from "../../hooks/useOA";
import useRole from "../../hooks/useRole";
import withLogin from "../../hooks/withLogin";
import { createMiniAppShortcut } from "../../services/zalo";
import CustomButton from "../../components/common/CustomButton";
import UserCardV2 from "../../components/views/home/UserCardV2";
import LayoutHeaderV2 from "../../components/layouts/LayoutHeaderV2";

const AccountPage: React.FunctionComponent = () => {
  const { userData, isAgency } = useRole();
  const { openChat } = useOA();
  return (
    <Page className="page">
      <div
        className="body pb-24"
        style={{ paddingTop: 0, background: "rgba(0,0,0,0.05)" }}
      >
        <LayoutHeaderV2
          showBackIcon={true}
        />
        <div style={{ marginTop: '78px', padding: '0px 12px' }}>
          <UserCardV2 showUserId={true} />
        </div>
        <SettingRoute
          header="Cài đặt tài khoản"
          items={[
            // {
            //   label: "Định danh tài khoản",
            //   href: "verification",
            //   commingSoon: true,
            // },
            {
              label: "Thông tin tài khoản ",
              href: "/account/AccountInfomation",
            },
            {
              label: "Đổi mật khẩu",
              href: "/account/change-password",
            },
          ]}
        />

        <SettingRoute
          header="Thông tin tham khảo"
          items={[
            {
              label: "Tài liệu hướng dẫn",
              href: "/account/instruction-manual",
            },
            {
              label: "Điều kiện và điều khoản sử dụng",
              href: "/terms-and-use",
            },
            {
              label: (
                <FlexBox>
                  <div style={{flex:1}}>Thủ tục bồi thường{" "}</div>
                  <Tag style={{background:'#F03E3E',marginRight:'12px'}} type={ETagType.HOT} className="" />
                </FlexBox>
              ),
              onClick: () => {
                openChat("Tôi cần hỗ trợ bồi thường");
              },
            },
          ]}
        />

        <SettingRoute
          header="Cộng tác viên *"
          items={[
            ...((!isAgency && [
              {
                label: (
                  <FlexBox className="relative ">
                    <div style={{flex:1}}>Trở thành cộng tác viên{" "}</div>
                    <Tag style={{background:'#F03E3E',marginRight:'12px'}} type={ETagType.HOT} className="" />
                  </FlexBox>
                ),
                href: "/account/become-agency",
              },
            ]) ||
              []),
            {
              label: (
                <FlexBox>
                  {/* <Icon
                    icon="zi-chat-solid"
                    size={20}
                    style={{ color: "#1D4ED8", marginRight: 4 }}
                  /> */}
                  Chat với chúng tôi
                </FlexBox>
              ),
              onClick: () => {
                openChat("Tôi cần hỗ trợ để trở thành cộng tác viên");
              },
              commingSoon:
                userData.commingSoonFeatures?.includes("becomeAgency"),
            },
          ]}
        />

        <FlexBox className="justify-center">
          <Button
            className="bg-primary-color w-[80%] mt-3"
            style={{ borderRadius: 8 }}
            onClick={createMiniAppShortcut}
          >
            Thêm ứng dụng vào màn hình chính
          </Button>
        </FlexBox>
        {/* <FlexBox className="justify-center">
          <CustomButton content="Đăng xuất" />
        </FlexBox> */}

        {/* <FlexBox className="justify-center">
          <Button
            className="bg-orange-500 w-[90%] mt-3"
            style={{ borderRadius: 12 }}
          >
            Liên hệ cứu hộ khẩn cấp
          </Button>
        </FlexBox> */}
      </div>

      <Navigation />
    </Page>
  );
};

export default withLogin(AccountPage);
