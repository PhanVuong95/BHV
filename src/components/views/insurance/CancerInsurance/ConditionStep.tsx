import React, { useState } from "react";
import FlexBox from "../../../common/FlexBox";
import CustomButton from "../../../common/CustomButton";
import { Box, Modal, Radio, Text } from "zmp-ui";
import useOA from "../../../../hooks/useOA";
import CustomTitle from "../../../Title/CustomTitle";
import RegisterInsuranceStepV2 from "../AutoInsurance/RegisterInsuranceStepV2";

type Props = {
  setallowBuy: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

const checkList: { value: boolean; lable: string }[] = [
  {
    value: false,
    lable: "Mắc bệnh ung thư",
  },
  {
    value: false,
    lable: "Đã từng đột quỵ",
  },
  {
    value: false,
    lable: "Bị suy thận mạn giai đoạn 4 trở lên",
  },
  {
    value: false,
    lable: "Bị biến chứng của tiểu đường",
  },
  {
    value: false,
    lable: "Bị suy tim độ 3 trở lên",
  },
  {
    value: false,
    lable: "Bị bệnh động mạch vành",
  },
];

const ConditionStep = ({ setCurrentStep, setallowBuy }: Props) => {
  const { openChat } = useOA();
  const [userCheckList, setuserCheckList] = useState(checkList);

  const [popupProps, setPopupProps] = useState<{
    visible: boolean;
    allow: boolean;
  }>({
    visible: false,
    allow: false,
  });

  const handleCheckCondition = () => {
    const allow = userCheckList.every((item) => !item.value);

    setPopupProps({
      allow,
      visible: true,
    });
  };
  const handleRadio = (index, e) => {
    setuserCheckList(
      userCheckList.map((i, pos) => (pos === index ? { ...i, value: e } : i))
    );
  };
  return (
    <div>
      <RegisterInsuranceStepV2 isCancer={true} step={2} />
      <Box className="body px-4 pb-44" style={{ paddingTop: 22 }}>
        <CustomTitle title="Tình trạng sức khoẻ của người được bảo hiểm" />
        <div style={{ color: "#646464", fontSize: "10px" }}>
          (Lưu ý: trả lời chính xác vì câu trả lời có ảnh hưởng đến điều kiện
          được mua bảo hiểm)
        </div>
        <div className="mt-2" style={{ fontSize: "14px", color: "#2E2E2E" }}>
          Trước khi tham gia bảo hiểm theo Hợp đồng bảo hiểm này, Người được bảo
          hiểm đã từng được bất kỳ cơ sở y tế hay nhân viên y tế nào xác định:
        </div>
        {userCheckList.map((item, index) => (
          <Box className="py-4" key={item.lable}>
            <div
              style={{ color: "#2E2E2E", fontSize: "14px", fontWeight: 500 }}
              className="pb-4"
            >
              {`${index + 1}, ${item.lable}`}
            </div>
            <div className="d-flex">
              <div className="pl-2 pr-2 d-flex w-100">
                {item?.value ? (
                  <svg
                    onClick={() => {
                      handleRadio(index, true);
                    }}
                    style={{ marginRight: "6px" }}
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12.5"
                      cy="12"
                      r="9"
                      stroke="#0544E8"
                      strokeWidth="6"
                    />
                  </svg>
                ) : (
                  <svg
                    onClick={() => {
                      handleRadio(index, true);
                    }}
                    style={{ marginRight: "6px" }}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="11"
                      stroke="#DEE7FE"
                      strokeWidth="2"
                    />
                  </svg>
                )}
                <div
                  onClick={() => {
                    handleRadio(index, true);
                  }}
                  style={{ width: "50%" }}
                >
                  {" "}
                  Có
                </div>
                {!item?.value ? (
                  <svg
                    onClick={() => {
                      handleRadio(index, false);
                    }}
                    style={{ marginRight: "6px" }}
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12.5"
                      cy="12"
                      r="9"
                      stroke="#0544E8"
                      strokeWidth="6"
                    />
                  </svg>
                ) : (
                  <svg
                    onClick={() => {
                      handleRadio(index, false);
                    }}
                    style={{ marginRight: "6px" }}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="11"
                      stroke="#DEE7FE"
                      strokeWidth="2"
                    />
                  </svg>
                )}
                <span
                  onClick={() => {
                    handleRadio(index, false);
                  }}
                >
                  Không
                </span>
              </div>
            </div>
            {/* <Radio.Group
              defaultValue={0}
              className="flex"
              onChange={(e) => {
                setuserCheckList(
                  userCheckList.map((i, pos) =>
                    pos === index ? { ...i, value: e == 1 } : i
                  )
                );
              }}
            >
              <Radio value={1} size="small" label="Có" />
              <Radio value={0} defaultChecked size="small" label="Không" />
            </Radio.Group> */}
          </Box>
        ))}
      </Box>
      <div
        className="p-4 fixed bottom-0 w-full bg-white"
        style={{
          boxShadow: "-10px 0px 10px #E2E8F0",
        }}
      >
        <FlexBox className="justify-around ">
          <CustomButton
            content="Quay lại"
            className="p-2 pl-8 pr-8 bg-white text-gray-800 border"
            onClick={() => {
              setCurrentStep((step) => step - 1);
            }}
          />
          <CustomButton
            content="Tiếp tục"
            className="bg-blue-700 p-2 pl-8 pr-8"
            onClick={handleCheckCondition}
          />
        </FlexBox>
      </div>
      <Modal
        {...popupProps}
        verticalActions="true"
        actions={
          popupProps.allow
            ? [
                {
                  text: "Tiếp tục",
                  highLight: true,
                  onClick: () => setallowBuy(true),
                },
              ]
            : [
                {
                  text: "Liên hệ với hỗ trợ",
                  highLight: true,
                  onClick: () =>
                    openChat("Tôi cần hỗ trợ mua bảo hiểm ung thư"),
                },
                {
                  text: "Xác nhận",
                  onClick: () =>
                    setPopupProps({
                      ...popupProps,
                      visible: false,
                    }),
                },
              ]
        }
      >
        {(popupProps.allow && (
          <Box>
            <Text.Title className="text-green-600 font-semibold">
              Người được bảo hiểm đủ điều kiện mua bảo hiểm
            </Text.Title>

            <Text className="pt-4">
              Vui lòng chọn <span className="font-bold">Tiếp tục</span> để tiếp
              tục mua bảo hiểm ung thư
            </Text>
          </Box>
        )) || (
          <Box>
            <Text.Title className="text-red-600 font-semibold">
              Người được bảo hiểm không đủ điều kiện mua bảo hiểm
            </Text.Title>
            <Text className="pt-4">
              Xin quý khách vui lòng chọn{" "}
              <span className="font-bold">Liên hệ với Hỗ trợ</span> để được hỗ
              trợ thêm hoặc <span className="font-bold">Xác nhận</span> để tiếp
              tục mua bảo hiểm cho người được bảo hiểm có tình trạng sức khỏe
              khác.
            </Text>
          </Box>
        )}
      </Modal>
    </div>
  );
};

export default ConditionStep;
