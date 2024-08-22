import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";
import { closeApp } from "zmp-sdk";
import { Button, Page, Text } from "zmp-ui";
import FlexBox from "../../components/common/FlexBox";
import useHandleDeeplink from "../../hooks/useHandleDeeplink";
import withLogin from "../../hooks/withLogin";
import { dynamicApiCall } from "../../services/user";

const LoginPortalPage: React.FunctionComponent = () => {
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts();
  const { handleGetState } = useHandleDeeplink();
  const handleConfirm = async () => {
    try {
      const state = handleGetState(window.location.href,'state');
      setLoading(true);
      const { message } = await dynamicApiCall(
        "/my/user/login-portal",
        "POST",
        {
          ...state?.data.body,
          dynamicApiCall: true,
        }
      );

      if (message) {
        addToast(message, {
          autoDismiss: true,
          appearance: "info",
        });
      }
      setTimeout(closeApp, 1000);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Page className="page">
      <div className="body pb-24 px-6 flex justify-center flex-col">
        <Text.Title className="text-center py-6 text-2xl font-bold tt-portal">
          Xác nhận đăng nhập
        </Text.Title>
        <Text className="text-center t-portal">
          Bạn vừa yêu cầu đăng nhập<br></br>
          vào portal.baohiem.app
        </Text>

        <Text className="text-center py-6 text-gray-600 text-sm c-portal">
          Khi xác nhận, bạn đồng ý cấp quyền truy cập và chỉnh sửa các thông tin trên tài khoản của bạn ở trang portal.baohiem.app
        </Text>
        <Text className="text-red-600 text-center ct-portal">
        Từ chối nếu không phải bạn (hoặc không phải trang web portal.baohiem.app) để tránh mất tài khoản 
        </Text>

        <FlexBox className="justify-around py-12">
          <Button type="danger" loading={loading} onClick={() => closeApp()} className="pt-btn">
            Từ chối
          </Button>
          <Button type="highlight" onClick={handleConfirm} loading={loading} className="pt-btn">
            Chấp nhận
          </Button>
        </FlexBox>
        
      </div>
    </Page>
  );
};

export default withLogin(LoginPortalPage);
