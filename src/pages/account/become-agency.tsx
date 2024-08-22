import React, { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { useRecoilState, useRecoilValue } from "recoil";
import { Page, Text, useNavigate } from "zmp-ui";
import CustomButton from "../../components/common/CustomButton";
import FlexBox from "../../components/common/FlexBox";
import Loading from "../../components/common/Loading";
import LayoutHeader from "../../components/layouts/LayoutHeader";
import useOA from "../../hooks/useOA";
import withLogin from "../../hooks/withLogin";
import { purchasedAtLeast1Insurance } from "../../services/insurance";
import { becomeAgency } from "../../services/referrer";
import { IUser } from "../../services/user";
import { globalState, userState } from "../../state";
import useRole from "../../hooks/useRole";
import CustomInput from "../../components/common/CustomInput";
import CustomTitle from "../../components/Title/CustomTitle";
import CustomFooter from "../../components/Footer/CustomFooter";
import FloatLabelV2 from "../../components/FloatLabel/FloatLabelV2";
import { ImageConditionalAgency } from "../../components/svgs/ChevronRightSvg";

type StepProps = {
  email?: string;
  setemail: React.Dispatch<React.SetStateAction<string | undefined>>;
  setstep: React.Dispatch<React.SetStateAction<number>>;
};
const Step0 = ({
  setstep,
  handleRegisterAgency,
  setemail,
}: StepProps & { handleRegisterAgency: () => void }) => {
  const { userData } = useRole();
  return (
    <div style={{ padding: 12 }}>
      <div style={{ marginBottom: "12px" }}>
        <CustomTitle
          title={"Chương trình tiếp thị liên kết dành cho cộng tác viên"}
        />
      </div>
      {[
        "Tạo link dễ dàng",
        "Miễn phí tham gia",
        "Thu nhập thụ động hàng tháng",
      ].map((itemMap) => (
        <div className="d-flex">
          <svg
            style={{ marginRight: 12 }}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17.4046 8.60563C17.6224 8.82904 17.6179 9.18675 17.3945 9.40459L11.3795 15.2694C11.0839 15.5576 10.613 15.5593 10.3153 15.2733L7.60854 12.6717C7.38357 12.4555 7.37647 12.0978 7.5927 11.8729C7.80893 11.6479 8.1666 11.6408 8.39158 11.857L10.8436 14.2137L16.6056 8.59553C16.829 8.37769 17.1868 8.38221 17.4046 8.60563Z"
              fill="#0544E8"
            />
          </svg>
          <span style={{ color: "#646464", fontSize: "14px" }}>{itemMap}</span>
        </div>
      ))}
      <div
        style={{ marginTop: "12px", marginLeft: "12px", marginRight: "12px" }}
      >
        <ImageConditionalAgency />
      </div>

      <CustomFooter
        callBack={() => {
          if (userData.email) handleRegisterAgency();
          else setstep((step) => step + 1);
        }}
        okText="Đăng ký"
      />
    </div>
  );
};
const Step1 = ({
  setemail,
  setstep,
  handleRegisterAgency,
  email,
}: StepProps & { handleRegisterAgency: () => void }) => {
  return (
    <div>
      <LayoutHeader
        showBackIcon={true}
        title={<Text className="text-white">Cộng tác viên</Text>}
        onBackClick={() => setstep((step) => step - 1)}
      />
      <Text.Title className="text-xl text-center font-bold p-8 pl-10 pr-10">
        Chương trình tiếp thị liên kết dành cho cộng tác viên
      </Text.Title>
      <Text className="text-center text-xs font-bold" style={{ opacity: 0.9 }}>
        Vui lòng nhập email để chúng tôi
        <br />
        gửi thư hướng dẫn thủ tục
      </Text>
      <FlexBox className="justify-center pt-4 pb-4">
        <CustomInput
          label="Nhập email của bạn (*)"
          value={email}
          style={{
            background: "unset",
            // color: "white",
            borderColor: "white",
            width: "80%",
          }}
          placeholder="Nhập email của bạn"
          onChange={(e) => setemail(e.target.value.trim())}
        />
      </FlexBox>
      <Text className="text-center text-xs font-bold" style={{ opacity: 0.9 }}>
        Lưu ý: Nhập chính xác email của bạn để
        <br />
        chúng tôi gửi email xác nhận
      </Text>
      <FlexBox className="justify-center pt-8">
        <CustomButton
          content="Đăng ký ngay"
          className="bg-gray-200 text-blue-700 font-semibold rounded-3xl"
          style={{
            width: "max-content",
          }}
          onClick={handleRegisterAgency}
        />
      </FlexBox>
      <img
        src="https://i.ibb.co/HYPMqk5/Frame.png"
        alt="Frame"
        width={"100%"}
        className="mt-16"
      />
    </div>
  );
};
const Step2 = ({ setemail, setstep }: StepProps) => {
  const navigate = useNavigate();
  const { needFollow, handleFollow } = useOA();

  const handleAccept = async () => {
    await handleFollow();
    navigate("/agency");
  };
  return (
    <div>
      <Text.Title className="text-2xl text-center font-bold p-8 pl-10 pr-10">
        CHÚC MỪNG BẠN ĐÃ ĐĂNG KÝ THÀNH CÔNG
      </Text.Title>
      {needFollow && (
        <>
          <Text
            className="text-center text-xs font-bold"
            style={{ opacity: 0.9 }}
          >
            Vui lòng thực hiện những bước dưới đây để
            <br />
            có thể nhận hoa hồng và thông báo
          </Text>
          <div
            className="rounded-xl shadow p-4 m-4"
            style={{ background: "rgba(255,255,255,0.1)" }}
          >
            <ul className="list-disc pl-4 text-sm font-semibold">
              <li>
                <strong>Đồng ý</strong> theo dõi Zalo OA của Bảo hiểm Việt
              </li>
              <li>
                <strong>Cho phép</strong> chia sẻ thông tin (tên, ảnh, số điện
                thoại) của bạn với bảo hiểm Việt
              </li>
            </ul>
          </div>
          <Text
            className="text-center text-xs font-bold"
            style={{ opacity: 0.9 }}
          >
            Hướng dẫn: Ấn nút dưới đây rồi chọn Cho phép
          </Text>
          <FlexBox className="justify-center pt-4">
            <CustomButton
              content="Tôi đồng ý"
              className="bg-gray-200 text-blue-700 font-semibold rounded-3xl"
              style={{
                width: "max-content",
              }}
              onClick={handleAccept}
            />
          </FlexBox>
        </>
      )}
      {!needFollow && (
        <>
          <Text
            className="text-center text-xs font-bold"
            style={{ opacity: 0.9 }}
          >
            Chúc mừng bạn đã đăng ký thành công trở thành
            <br />
            cộng tác viên của Bảo hiểm Việt! Giờ đây bạn có thể:
          </Text>
          <div
            className="rounded-xl shadow p-4 m-4"
            style={{ background: "rgba(255,255,255,0.1)" }}
          >
            <ul className="list-disc pl-4 text-sm font-semibold">
              <li>
                <strong>Chia sẻ link</strong> giới thiệu để nhận hoa hồng
              </li>
              <li>
                <strong>Nhận thông báo</strong> ngay khi có khách hàng đăng ký
                thành công
              </li>
              <li>
                <strong>Nhận báo cáo</strong> theo dõi doanh thu
              </li>
              <li>
                <strong>Cùng nhiều tính năng khác nữa</strong>
              </li>
            </ul>
          </div>

          <FlexBox className="justify-center pt-4">
            <CustomButton
              content="Tiếp tục"
              className="bg-gray-200 text-blue-700 font-semibold rounded-3xl"
              style={{
                width: "max-content",
              }}
              onClick={() => {
                navigate("/agency");
              }}
            />
          </FlexBox>
        </>
      )}

      <img
        src="https://i.ibb.co/9y5vCm0/Frame.png"
        alt="Frame"
        width={"100%"}
        className="mt-16"
      />
    </div>
  );
};

const BecomeAgencySteps = ({
  isPurchased,
  referrer,
}: {
  isPurchased?: boolean;
  referrer?: IUser;
}) => {
  const globalValue = useRecoilValue(globalState);
  const { addToast } = useToasts();
  const [user, setUserState] = useRecoilState(userState);
  const [active, setActive] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const [registerStatus, setregisterStatus] = useState<
    "pending" | "loading" | "success" | "error"
  >("pending");

  const [email, setemail] = useState(user.email);

  const handleRegisterAgency = () => {
    setregisterStatus("loading");
    becomeAgency(email)
      .then((res) => setUserState(res))
      .then(() => {
        addToast("Chúc mừng bạn đã trở thành cộng tác viên", {
          autoDismiss: true,
          appearance: "success",
        });
        setregisterStatus("success");
        setStep(2);
      })
      .catch((error) => {
        console.error(error);
        setregisterStatus("error");
        addToast("Bạn phải mua ít nhất 1 bảo hiểm để trở thành cộng tác viên", {
          autoDismiss: true,
          appearance: "error",
        });
      });
  };

  return (
    <div>
      <LayoutHeader
        showBackIcon={true}
        title={<Text className="text-white">Trở thành cộng tác viên</Text>}
      />
      {step === 0 && (
        <Step0
          setemail={setemail}
          setstep={setStep}
          handleRegisterAgency={handleRegisterAgency}
        />
      )}
      {step === 1 && (
        <Step1
          email={email}
          setemail={setemail}
          setstep={setStep}
          handleRegisterAgency={handleRegisterAgency}
        />
      )}
      {registerStatus === "success" && (
        <Step2 setemail={setemail} setstep={setStep} />
      )}
    </div>
  );
};

const BecomeAgencyPage = () => {
  const [isPurchased, setisPurchased] = useState<boolean | undefined>();
  const [referrer, setReferrer] = useState<IUser | undefined>();

  useEffect(() => {
    purchasedAtLeast1Insurance()
      .then((res) => {
        setisPurchased(res.purchased);
        setReferrer(res.referrer);
      })
      .catch(console.error);
  }, []);

  if (isPurchased === undefined) return <Loading />;

  return (
    <Page className="page ">
      <div className="body pt-11 bg-gradient">
        <LayoutHeader showBackIcon />
        <BecomeAgencySteps isPurchased={isPurchased} referrer={referrer} />
      </div>
    </Page>
  );
};

export default withLogin(BecomeAgencyPage);
