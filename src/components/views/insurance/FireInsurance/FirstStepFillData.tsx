import moment from "moment";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import { Box, DatePicker, Select, Text } from "zmp-ui";
import {
  ECategory,
  EInsuranceFeature,
  EInsuranceSource,
  EPVIFireBizTypeValue,
  EPVIFirePackageValue,
} from "../../../../enums/insurance";
import {
  composeValidator,
  isStartDateValid,
} from "../../../../helpers/validator";
import useFormatter from "../../../../hooks/useFormatter";
import {
  ICategoryResponse,
  ICreateFireInsuranceParams,
  IInsuranceFeeDetails,
} from "../../../../interfaces/insurance";
import { getInsuranceCategory } from "../../../../services/insurance";
import { IVoucher } from "../../../../services/referrer";
import { insuranceServicesState } from "../../../../state";
import FlexBox from "../../../common/FlexBox";
import CheckSvg from "../../../svgs/CheckSvg";

import { SuppilerLogos } from "../Suppliers";
import { openUrlInWebview } from "../../../../services/zalo";
import SelectVoucher from "../SelectVoucher";
import Footer from "../Footer";
import CustomSelectV3 from "../../../select/CustomSelectV3";
import CustomDatePickerV2 from "../../../common/DatePicker/CustomDatePickerV2";
import { DEFAULT_FORMAT_DATE } from "../AutoInsurance/AutoInsuranceFormFillDataStep";
import CustomTitle from "../../../Title/CustomTitle";

const { Option } = Select;

type Props = {
  insuranceData: ICreateFireInsuranceParams;
  setInsuranceData?: React.Dispatch<
    React.SetStateAction<ICreateFireInsuranceParams>
  >;
  setStep?: React.Dispatch<React.SetStateAction<number>>;
  feeDetails: IInsuranceFeeDetails;
  loadingFeeDetails: boolean;
  availableVouchers: IVoucher[];
  step: number;

  currentStep: number;
  setcurrentStep: React.Dispatch<React.SetStateAction<number>>;
  activeValidate: boolean;
  setactiveValidate: React.Dispatch<React.SetStateAction<boolean>>;
};

const FirstStepFillData = (props: Props) => {
  const {
    insuranceData,
    setInsuranceData = () => { },
    setStep = () => { },
    feeDetails,
    loadingFeeDetails,
    availableVouchers,
    step,
    currentStep,
    setcurrentStep,
    activeValidate,
    setactiveValidate,
  } = props;

  const { fee, discount, directReferrer } = feeDetails;
  const { benefitUrl } = fee;
  const { formatter } = useFormatter();
  const insuranceServicesValue = useRecoilValue(insuranceServicesState);

  const [pviFirePackageCategory, setPviFirePackageCategory] = useState<
    ICategoryResponse[]
  >([]);

  const [pviBizTypeCategory, setPviBizTypeCategory] = useState<
    ICategoryResponse[]
  >([]);

  useEffect(() => {
    getInsuranceCategory(ECategory.FIRE_PACKAGES, {
      source: EInsuranceSource.PVI,
    }).then((res) => setPviFirePackageCategory(res));
    getInsuranceCategory(ECategory.BIZ_TYPES, {
      source: EInsuranceSource.PVI,
    }).then((res) => setPviBizTypeCategory(res));
  }, []);

  const suppliers = [
    ...(insuranceServicesValue.features.find(
      (item) => item.feature === EInsuranceFeature.FIRE_01
    )?.sources || []),
  ];

  return (
    <div key={`currentStep_${currentStep}`}>
      <Box className="p-4 pb-44">
        <div className="mb-2">
          <CustomTitle
            title='Nội dung bảo hiểm'
          />
        </div>
        {suppliers.length > 1 && (
          <>
            <Text.Title className="font-medium text-lg leading-6 pt-4 pb-2">
              Nhà cung cấp
            </Text.Title>
            <FlexBox className="justify-center pb-4 pt-1">
              {suppliers.map((item) => {
                const logo = SuppilerLogos()[item];
                return (
                  <FlexBox
                    key={item}
                    onClick={(e) =>
                      setInsuranceData((data) => ({
                        ...data,
                        source: item as EInsuranceSource,
                      }))
                    }
                    className="ml-4 mr-4 pt-2 pb-2 items-center rounded-xl p-2"
                    style={{
                      ...((insuranceData.source == item && {
                        border: "1px solid #2FA0CC",
                      }) || { opacity: 0.5 }),
                    }}
                  >
                    <div className="relative">
                      {logo}
                      {insuranceData.source == item && (
                        <div className="absolute right-0 bottom-0">
                          <CheckSvg />
                        </div>
                      )}
                    </div>
                    <Text className="pl-2">{item}</Text>
                  </FlexBox>
                );
              })}
            </FlexBox>
          </>
        )}

        <Box className=" rounded-xl">
          <CustomSelectV3
            onChange={(value) => {
              setInsuranceData((insurance) => ({
                ...insurance,

                [insuranceData.source]: {
                  ...insuranceData[insuranceData.source],
                  package: value?.Value,
                },
              }))
            }}
            label="Gói bảo hiểm"
            options={pviFirePackageCategory}
            value={insuranceData[insuranceData.source]?.package || EPVIFirePackageValue.PACKAGE_01}
          />
          <div
            onClick={() => {
              if (benefitUrl) openUrlInWebview(benefitUrl);
            }}
          >
            <Text className="text-blue-500 italic text-sm">{`Xem quyền lợi bảo hiểm`}</Text>
          </div>
        </Box>
        <div className="mt-2">
          <CustomSelectV3
            onChange={(value) => {
              setInsuranceData((insurance) => ({
                ...insurance,

                [insuranceData.source]: {
                  ...insuranceData[insuranceData.source],
                  bizType: value?.Value,
                },
              }))
            }}
            label="Loại hình kinh doanh"
            options={pviBizTypeCategory}
            value={insuranceData[insuranceData.source]?.bizType || EPVIFireBizTypeValue.RETAIL}
          />

        </div>

        <Text.Title className="font-medium text-lg leading-6 pt-4">
          Thời hạn bảo hiểm
        </Text.Title>

        <FlexBox className="pb-4 pt-4">
          <div className="pr-2 w-50">
            {/* <DatePicker
              label="1 năm bắt đầu từ"
              placeholder="Ngày bắt đầu"
              mask
              maskClosable
              dateFormat="dd/mm/yyyy"
              title="Ngày bắt đầu"
              defaultValue={new Date(insuranceData.startDate)}
              onChange={(value) => {
                setInsuranceData((insurance) => ({
                  ...insurance,
                  startDate: new Date(value),
                }));
              }}
              errorText={
                composeValidator(
                  [isStartDateValid],
                  activeValidate,
                  insuranceData.startDate
                ).message
              }
              status={
                composeValidator(
                  [isStartDateValid],
                  activeValidate,
                  insuranceData.startDate
                ).status
              }
            /> */}
            <CustomDatePickerV2
              onChange={(e, e1) => {
                const selectedDate = moment(e1, DEFAULT_FORMAT_DATE).toISOString();
                setInsuranceData((insurance) => ({
                  ...insurance,
                  startDate: selectedDate,
                }));
              }}
              label="Từ ngày"
              value={(insuranceData.startDate)}
              disabledDate={(date) => {
                return date < moment().startOf('day');
              }}
            />
          </div>

          <div className="pl-2 w-50" style={{ pointerEvents: "none" }}>
            <CustomDatePickerV2
              disabled={true}
              onChange={(e, e1) => { }}
              label="Đến ngày"
              value={new Date(
                moment(insuranceData.startDate).add(1, "years").toISOString()
              )}
            />
          </div>
        </FlexBox>
        <SelectVoucher
          setInsuranceData={setInsuranceData}
          discount={discount}
          availableVouchers={availableVouchers}
          loadingFeeDetails={loadingFeeDetails}
          insuranceData={insuranceData}
          directReferrer={directReferrer}
        />
      </Box>

      <Footer
        nextContent="Tiếp tục"
        loadingFeeDetails={loadingFeeDetails}
        feeDetails={feeDetails}
        handlePrev={() => {
          setStep((step) => step - 1);
        }}
        handleNext={() => {
          console.log(insuranceData[insuranceData.source]?.package);
          setactiveValidate(true);
          setTimeout(() => setactiveValidate(false), 1000);

          if (loadingFeeDetails || !fee?.total) return;

          // if (!insuranceData[insuranceData.source]?.package) return;

          setactiveValidate(false);
          setcurrentStep((step) => step + 1);
        }}
      />
    </div>
  );
};

export default FirstStepFillData;
