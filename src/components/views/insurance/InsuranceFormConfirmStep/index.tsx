import React, { useState } from "react";
import { Checkbox, Icon, Text } from "zmp-ui";
import { EInsuranceFeature, EInsuranceSource } from "../../../../enums/insurance";
import useFormatter from "../../../../hooks/useFormatter";
import {
  IInsuranceFeeDetails,
  InsuranceDataType,
} from "../../../../interfaces/insurance";
import CustomButton from "../../../common/CustomButton";
import FlexBox from "../../../common/FlexBox";
import Loading from "../../../common/Loading";
import { ShowFieldsData } from "../../../common/ShowFieldsData";
import insurance from "../../../../pages/insurance";
import { openUrlInWebview } from "../../../../services/zalo";
import InsurancePdf from "../../../common/InsurancePdf";
import { IInsuranceResponse } from "../../../../interfaces/insurance";
import { UNIT_VND, formatNumberWithCommas } from "../../../Utils";

export * from "./Auto";
export * from "./Motor";
export * from "./Home";
export * from "./PersonalAccident";
export * from "./Travel";
export * from "./Fire";
export * from "./Health";
export * from "./Student";
export * from "./BHXH";
export * from "./Cancer";
export * from "./ExtendedAccident";

const InsuranceFormConfirmStep = ({
  source,
  loadingInsuranceRequest,
  handleCreateInsuranceRequest,
  feeDetails,
  loadingFeeDetails,
  setStep,
  feature,

}: {
  source?: EInsuranceSource;
  loadingInsuranceRequest: boolean;
  handleCreateInsuranceRequest: () => Promise<void>;
  feeDetails: IInsuranceFeeDetails;
  loadingFeeDetails: boolean;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  feature: EInsuranceFeature;
}) => {
  const [insurance, setinsurance] = useState<IInsuranceResponse | undefined>();
  const { discount, fee } = feeDetails;
  const { formatter } = useFormatter();
  const [accept, setaccept] = useState(true);
  const [createResponse, setPdf] = useState<string | undefined>();

  return (
    <>
      <FlexBox
        className="fixed flex-col bottom-0 left-0 p-4 pt-0 pb-6"
        style={{
          width: "100%",
          background: "white",
          boxShadow: "-10px 0px 10px #E2E8F0",
        }}
      >
        <div>
          {(!loadingFeeDetails && feeDetails && (
            <ShowFieldsData
              half={false}
              datas={[
                {
                  style: { padding: 0, marginBottom: 24 },
                  header: (
                    <><FlexBox className="c-acpect justify-between pt-5 pb-1">
                      <Checkbox
                      size="small"
                        label={(
                          <Text className="text-xs">
                            Tôi đã đọc và xác nhận các thông tin trên là hoàn toàn đúng sự thật
                          </Text>
                        ) as any}
                        value={1}
                        defaultChecked={true}
                        onChange={(e) => setaccept(e.target.checked)} />
                    </FlexBox>


                      {source != EInsuranceSource.DNP &&
                        <FlexBox className="justify-between pt-5 pb-5">

                          <Text.Title className="text-[#565758] text-lg">

                            Tổng phí thanh toán
                            {/* <Text className="text-[#006AF5] fs-12">Thông tin chi tiết</Text> */}

                          </Text.Title>
                          <Text.Title className="text-lg text-[#1E3880] ">
                            {loadingFeeDetails
                              ? "---"
                              : formatNumberWithCommas(
                                Math.max((fee?.total || 0) - discount, 0)
                              )} VNĐ
                          </Text.Title>
                        </FlexBox>
                      }
                    </>


                  ),



                  items: [
                    ...(([
                      EInsuranceFeature.AUTO_01,
                      EInsuranceFeature.MOTOR_01,
                    ].includes(feature) && [
                        ...((fee.compulsory > 0 && [
                          {
                            style: { padding: "4px 0 0 0" },
                            lable: (
                              <Text className="text-xs">
                                Phí bảo hiểm bắt buộc:
                              </Text>
                            ),
                            value: (
                              <Text className="text-sm">
                                {formatNumberWithCommas(Number(fee.compulsory))} {UNIT_VND}
                              </Text>
                            ),
                          },
                        ]) ||
                          []),
                        ...((fee.voluntary > 0 && [
                          {
                            style: { padding: "4px 0 0 0" },
                            lable: (
                              <Text className="text-xs">
                                Phí bảo hiểm người ngồi trên xe:
                              </Text>
                            ),
                            value: (
                              <Text className="text-sm">
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(Number(fee.voluntary))}
                              </Text>
                            ),
                          },
                        ]) ||
                          []),
                      ]) ||
                      []),

                    ...(([EInsuranceFeature.PERSONAL_01].includes(feature) && [
                      {
                        style: { padding: "4px 0 0 0" },
                        lable: (
                          <Text className="text-xs">
                            Phí sản phẩm bảo hiểm chính:
                          </Text>
                        ),
                        value: (
                          <Text className="text-sm">
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(Number(fee.compulsory))}
                          </Text>
                        ),
                      },
                      ...((fee.voluntary > 0 && [
                        {
                          style: { padding: "4px 0 0 0" },
                          lable: (
                            <Text className="text-xs">
                              Phí sản phẩm bảo hiểm bổ sung:
                            </Text>
                          ),
                          value: (
                            <Text className="text-sm">
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(Number(fee.voluntary))}
                            </Text>
                          ),
                        },
                      ]) ||
                        []),
                    ]) ||
                      []),
                    ...((discount > 0 && [
                      {
                        style: { padding: "4px 0 0 0" },
                        lable: (
                          <Text className="text-xs pb-2 italic">Đã giảm: </Text>
                        ),
                        value: (
                          <Text className="line-through text-sm">
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(-Number(discount))}
                          </Text>
                        ),
                      },
                    ]) ||
                      []),
                  ],
                },
              ]}
            />
          )) || <Loading />}
        </div>

        {(createResponse &&
          <FlexBox className="mb-4 justify-around">
            {/* <InsurancePdf
                src={url}
                transactionId={insurance.transactionId}
                maxHeight="calc(100vh - 190px)"
              /> */}
            <div
              className="bg-cyan-500 items-center flex text-white pl-4 pr-4 pt-1 pb-1"
              style={{ borderRadius: 20, width: "max-content" }}
              onClick={() => openUrlInWebview(createResponse)}
            >
              <Icon icon="zi-download" />
              <Text className="pl-1">Tải xuống</Text>
            </div>


          </FlexBox>
        )}

        <FlexBox
          className="justify-around "
          style={{
            width: "100%",
            background: "white",
          }}
        >
          <CustomButton
            content="Quay lại"
            className="p-2 pl-8 pr-8 bg-white text-gray-800 border"
            onClick={() => setStep((step) => Math.max(0, step - 1))}
          />
          {source == EInsuranceSource.DNP ?
            <CustomButton
              loading={loadingInsuranceRequest}
              content="Lưu thông tin"
              className="bg-blue-700 p-2 pl-8 pr-8"
              onClick={() => {
                handleCreateInsuranceRequest();
              }}
            />
            :
            <CustomButton
              loading={loadingInsuranceRequest}
              content="Thanh toán"
              className="bg-blue-700 p-2 pl-8 pr-8"
              onClick={() => {
                handleCreateInsuranceRequest();
              }}
            />
          }
        </FlexBox>
      </FlexBox>
    </>
  );
};

export default InsuranceFormConfirmStep;
