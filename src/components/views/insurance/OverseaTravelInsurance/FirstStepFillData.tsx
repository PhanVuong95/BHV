import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";

import { Box, DatePicker, Select, Text, Icon } from "zmp-ui";
import { EGender } from "../../../../enums";
import {
  ECategory,
  EInsuranceFeature,
  EInsuranceSource,
} from "../../../../enums/insurance";
import {
  composeValidator,
  isEmpty,
  isGTE,
  isLTE,
  isStartDateValid,
} from "../../../../helpers/validator";
import useFormatter from "../../../../hooks/useFormatter";
import {
  ICategoryResponse,
  ICreateOverseaTravelInsuranceParams,
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
import CustomInput from "../../../common/CustomInput";
import Footer from "../Footer";
import CustomSelectV3 from "../../../select/CustomSelectV3";
import CustomTitle from "../../../Title/CustomTitle";
import RegisterInsuranceStepV2 from "../AutoInsurance/RegisterInsuranceStepV2";
import CustomDatePickerV2 from "../../../common/DatePicker/CustomDatePickerV2";
import { DEFAULT_FORMAT_DATE } from "../AutoInsurance/AutoInsuranceFormFillDataStep";

const { Option } = Select;

type Props = {
  insuranceData: ICreateOverseaTravelInsuranceParams;
  setInsuranceData?: React.Dispatch<
    React.SetStateAction<ICreateOverseaTravelInsuranceParams>
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

  const [pviTravelCategory, setpviTravelCategory] = useState<
    ICategoryResponse[]
  >([]);
  const [bicTravelCategory, setbicTravelCategory] = useState<
    ICategoryResponse[]
  >([]);

  const [bicAreaCategory, setbicAreaCategory] = useState<ICategoryResponse[]>(
    []
  );

  useEffect(() => {
    getInsuranceCategory(ECategory.OVERSEA_TRAVEL_PACKAGE, {
      source: EInsuranceSource.PVI,
    }).then((res) => setpviTravelCategory(res));
    getInsuranceCategory(ECategory.OVERSEA_TRAVEL_PACKAGE, {
      source: EInsuranceSource.BIC,
    }).then((res) => setbicTravelCategory(res));
    getInsuranceCategory(ECategory.OVERSEA_TRAVEL_AREA, {
      source: EInsuranceSource.BIC,
    }).then((res) => setbicAreaCategory(res));
  }, []);

  const suppliers = [
    ...(insuranceServicesValue.features.find(
      (item) => item.feature === EInsuranceFeature.TRAVEL_02
    )?.sources || []),
  ];

  const travelCategory = useMemo(
    () =>
    ({
      [EInsuranceSource.BIC]: bicTravelCategory,
      [EInsuranceSource.PVI]: pviTravelCategory,
    }[insuranceData.source]),
    [pviTravelCategory, bicTravelCategory, insuranceData.source]
  );

  return (
    <div key={`currentStep_${currentStep}`}>
      <RegisterInsuranceStepV2 step={1} />
      <Box className="p-4 pb-44">
        <CustomTitle
          title='Nội dung bảo hiểm'
        />
        <div className="mt-2"></div>
        {suppliers.length > 1 && (
          <>
            <Text.Title className="font-medium text-lg leading-6 pt-4 pb-2">
              Nhà cung cấp
            </Text.Title>
            <FlexBox className="justify-center pb-4 pt-1 border-b">
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
            onChange={(value) =>
              setInsuranceData((insurance) => ({
                ...insurance,

                [insuranceData.source]: {
                  ...insuranceData[insuranceData.source],
                  package: value?.Value,
                },
              }))
            }
            options={travelCategory}
            value={insuranceData[insuranceData.source].package}
            label='Chọn gói bảo hiểm'
          />
          <CustomSelectV3
            onChange={(value) =>
              setInsuranceData((insurance) => ({
                ...insurance,

                [insuranceData.source]: {
                  ...insuranceData[insuranceData.source],
                  area: value?.Value,
                },
              }))
            }
            options={bicAreaCategory}
            value={insuranceData[insuranceData.source].area}
            label='Phạm vi du lịch'
          />
        </Box>
        <Box>
          <CustomInput
            label="Số người tham gia bảo hiểm"
            value={insuranceData.personNum}
            onChange={(e) => {
              const personNum = Math.min(
                100,
                Number(e.target.value.replace(/[^\d]/g, ""))
              );
              setInsuranceData((insurance) => ({
                ...insurance,
                personNum,
                over70personNum:
                  personNum < insurance.over70personNum
                    ? personNum
                    : insurance.over70personNum,
                attachedList: [
                  ...insurance.attachedList,
                  ...new Array(Number(personNum)).fill({
                    birthday: moment().subtract(18, "years").valueOf(),
                    fullName: "",
                    gender: EGender.MALE,
                    address: "",
                    identityCardNum: "",
                  }),
                ].slice(0, personNum || 1),
              }));
            }}
            errorText={
              composeValidator(
                [isEmpty, isLTE, isGTE],
                activeValidate,
                insuranceData.personNum,
                { min: 1, max: 100 }
              ).message
            }
            status={
              (composeValidator(
                [isEmpty, isLTE, isGTE],
                activeValidate,
                insuranceData.personNum,
                { min: 1, max: 100 }
              ).status === "error" &&
                "error") ||
              ""
            }
          />
        </Box>
        <CustomTitle
          title='Thời hạn bảo hiểm'
        />
        <Box className="mt-2">
          <CustomInput
            label="Số ngày du lịch"
            value={insuranceData.duration}
            onChange={(e) => {
              setInsuranceData((insurance) => ({
                ...insurance,
                duration: Math.min(
                  180,
                  Number(e.target.value.replace(/[^\d]/g, ""))
                ),
              }));
            }}
            errorText={
              composeValidator(
                [isEmpty, isLTE, isGTE],
                activeValidate,
                insuranceData.duration,
                { min: 1, max: 180 }
              ).message
            }
            status={
              (composeValidator(
                [isEmpty, isLTE, isGTE],
                activeValidate,
                insuranceData.duration,
                { min: 1, max: 180 }
              ).status === "error" &&
                "error") ||
              ""
            }
          />

        </Box>

        <FlexBox className="pb-4 pt-4">
          <div className="pr-2 w-50">
            <CustomDatePickerV2
              onChange={(e, e1) => {
                const selectedDate = moment(e1, DEFAULT_FORMAT_DATE).toISOString();
                setInsuranceData((insurance) => ({
                  ...insurance,
                  startDate: selectedDate,
                }));
              }}
              label="Ngày bắt đầu"
              value={(insuranceData.startDate)}
              disabledDate={(date) => {
                return date < moment().startOf('day');
              }}
            />
          </div>
          <div className="pl-2 w-50">
            <CustomDatePickerV2
              disabled={true}
              onChange={(e, e1) => { }}
              label="Đến ngày"
              value={new Date(
                moment(insuranceData.startDate)
                  .startOf("days")
                  .add(insuranceData.duration - 1, "days")
                  .toISOString()
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
          setactiveValidate(true);
          setTimeout(() => setactiveValidate(false), 1000);

          if (loadingFeeDetails || !fee?.total) return;

          if (!insuranceData[insuranceData.source].package) return;

          if (
            composeValidator(
              [isEmpty, isLTE, isGTE],
              true,
              insuranceData.personNum,
              { min: 1, max: 100 }
            ).status === "error"
          )
            return;

          if (
            composeValidator(
              [isEmpty, isLTE, isGTE],
              true,
              insuranceData.duration,
              { min: 1, max: 180 }
            ).status === "error"
          )
            return;

          setactiveValidate(false);
          setcurrentStep((step) => step + 1);
        }}
      />
    </div>
  );
};

export default FirstStepFillData;
