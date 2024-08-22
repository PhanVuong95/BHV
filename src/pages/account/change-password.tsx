import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Button, Checkbox, Input, Page, Text, useNavigate } from "zmp-ui";
import FlexBox from "../../components/common/FlexBox";
import LayoutHeader from "../../components/layouts/LayoutHeader";
import UserCard from "../../components/views/home/UserCard";
import {
  composeValidator,
  matchConfirmPassword,
  validateEmail,
  validateEmpty,
  validateMatch,
} from "../../helpers/validator";
import withLogin from "../../hooks/withLogin";
import { userState } from "../../state";
import { isEmailValid, isEmpty } from "../../helpers/validator";
import { changePassword } from "../../services/user";
import { useToasts } from "react-toast-notifications";
import CustomInput from "../../components/common/CustomInput";
import { Form } from "antd";
import FloatLabel from "../../components/FloatLabel";
import CustomTitle from "../../components/Title/CustomTitle";
import CustomFooter from "../../components/Footer/CustomFooter";
import UserCardV2 from "../../components/views/home/UserCardV2";
import LayoutHeaderV2 from "../../components/layouts/LayoutHeaderV2";

export const ChangePasswordForm = ({ callback }: { callback?: () => void }) => {
  const [form] = Form.useForm();
  const email = Form.useWatch("email", form);
  const password = Form.useWatch("password", form);
  const confirmNewPassword = Form.useWatch("confirmNewPassword", form);

  const [user, setUser] = useRecoilState(userState);
  const [activeValidate, setActiveValidate] = useState<boolean>(false);

  const [newData, setnewData] = useState({
    email: user.email || "",
    newPassword: "",
    confirmNewPassword: "",
  });

  console.log(newData);
  const [visible, setvisile] = useState(false);
  const [loading, setloading] = useState(false);
  const { addToast } = useToasts();

  const handleChangePassword = () => {
    setActiveValidate(true);
    setTimeout(() => setActiveValidate(false), 1000);

    if (
      composeValidator(
        [isEmpty, matchConfirmPassword],
        true,
        newData.newPassword,
        newData.confirmNewPassword
      ).status === "error"
    )
      return;
    if (
      composeValidator([isEmpty, isEmailValid], true, newData.email).status ===
      "error"
    )
      return;
    setloading(true);

    // call api
    changePassword(newData)
      .then((res) => {
        setUser(res);
        addToast("Cập nhật thành công", {
          autoDismiss: true,
          appearance: "success",
        });
      })
      .then(() => {
        if (callback) callback();
      })
      .catch((error) => {
        console.error(error);
        addToast("Email đã được sử dụng", {
          autoDismiss: true,
          appearance: "error",
        });
      })
      .finally(() => {
        setloading(false);
      });
  };
  useEffect(() => {
    form.setFieldValue("email", user.email || "");
  }, []);

  return (
    <div className="h-full p-4 bg-white w-full height-100vh">
      <div style={{ marginBottom: 12 }}>
        <CustomTitle title={"Đổi mật khẩu"} />
      </div>
      <Form
        form={form}
        name="basic"
        className="custom-infomation"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        style={{ width: "100%" }}
        initialValues={{ remember: true }}
        onFinish={async () => {
          try {
            handleChangePassword();
          } catch (error) {}
        }}
        autoComplete="off"
      >
        <FloatLabel
          form={form}
          disabled={!!user.email}
          onChange={(e) =>
            setnewData((data) => ({
              ...data,
              email: e.target.value,
            }))
          }
          rules={[
            validateEmpty(),
            {
              validator: async function (_rule, value) {
                if (value) return validateEmail(value.trim());
              },
            },
          ]}
          label="Email (*)"
          name="email"
          value={email}
        />

        <FloatLabel
          type={visible ? "text" : "password"}
          form={form}
          onChange={(e) =>
            setnewData((data) => ({
              ...data,
              newPassword: e.target.value,
            }))
          }
          rules={[validateEmpty()]}
          label="Mật khẩu mới (*)"
          name="password"
          value={password}
        />
        <div className="relative">
          <FloatLabel
            type={visible ? "text" : "password"}
            form={form}
            onChange={(e) =>
              setnewData((data) => ({
                ...data,
                confirmNewPassword: e.target.value,
              }))
            }
            rules={[
              validateEmpty(),
              {
                validator: async function (_rule, value) {
                  if (value) return validateMatch(value.trim(), password);
                },
              },
            ]}
            label="Nhập lại khẩu mới (*)"
            name="confirmNewPassword"
            value={confirmNewPassword}
          />
          {confirmNewPassword === password && confirmNewPassword && (
            <svg
              className="custom-icon-right"
              style={{ right: "12px" }}
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
        <Checkbox
          defaultChecked={visible}
          value={1}
          label="Hiện mật khẩu"
          onChange={() => setvisile(!visible)}
        />
        <CustomFooter />
        {/* <FlexBox
          className="fixed bottom-0 justify-end left-0 p-4 pb-6"
          style={{
            width: "100%",
            background: "white",
            boxShadow: "-10px 0px 10px #E2E8F0",
          }}
        >
          <Button
            loading={loading}
            className=""
            fullWidth
            type="highlight"
            htmlType="submit"
          // onClick={handleChangePassword}
          >
            Đổi mật khẩu
          </Button>
        </FlexBox> */}
      </Form>
    </div>
  );
};

const ChangePasswordPage = () => {
  const navigate = useNavigate();

  return (
    <Page className="page ">
      <div className="body pt-11 " style={{ background: "rgb(243 243 243)" }}>
        <LayoutHeaderV2 title={"Mật khẩu"} showBackIcon />

        {/* <LayoutHeader showBackIcon />
        <div className="bg-gradient">
          <UserCardV2 />
        </div> */}
        <ChangePasswordForm />
      </div>
    </Page>
  );
};

export default withLogin(ChangePasswordPage);
