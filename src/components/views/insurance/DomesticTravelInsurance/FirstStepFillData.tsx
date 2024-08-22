import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";

import { Box, DatePicker, Select, Text, Sheet, Icon } from "zmp-ui";
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
  ICreateDomesticTravelInsuranceParams,
  ICreateMotorInsuranceParams,
  IInsuranceFeeDetails,
} from "../../../../interfaces/insurance";
import { getInsuranceCategory } from "../../../../services/insurance";
import { IVoucher } from "../../../../services/referrer";
import { insuranceServicesState } from "../../../../state";
import FlexBox from "../../../common/FlexBox";
import CheckSvg from "../../../svgs/CheckSvg";
import { BenefitLine } from "../BenefitLine";
import { SuppilerLogos } from "../Suppliers";
import SelectVoucher from "../SelectVoucher";
import CustomInput from "../../../common/CustomInput";
import Footer from "../Footer";
import CustomSelectV3 from "../../../select/CustomSelectV3";
import RegisterInsuranceStepV2 from "../AutoInsurance/RegisterInsuranceStepV2";
import CustomTitle from "../../../Title/CustomTitle";
import CSuplier from "../../../select/CSuplier";
import CustomDatePickerV2 from "../../../common/DatePicker/CustomDatePickerV2";
import { DEFAULT_FORMAT_DATE } from "../AutoInsurance/AutoInsuranceFormFillDataStep";
import CSubTitlte from "../../../CSubTitlte";

const { Option } = Select;

type Props = {
  insuranceData: ICreateDomesticTravelInsuranceParams;
  setInsuranceData?: React.Dispatch<
    React.SetStateAction<ICreateDomesticTravelInsuranceParams>
  >;
  setStep: React.Dispatch<React.SetStateAction<number>>;
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
    setInsuranceData = () => {},
    feeDetails,
    loadingFeeDetails,
    availableVouchers,
    currentStep,
    setcurrentStep,
    activeValidate,
    setactiveValidate,
    setStep,
  } = props;

  const { fee, discount, directReferrer } = feeDetails;
  const { travelPackageFee } = fee;
  const { formatter } = useFormatter();
  const insuranceServicesValue = useRecoilValue(insuranceServicesState);
  const [isVisibleBenefit, setisVisibleBenefit] = useState<boolean>(false);

  const [pviTravelCategory, setpviTravelCategory] = useState<
    ICategoryResponse[]
  >([]);
  const [bicTravelCategory, setbicTravelCategory] = useState<
    ICategoryResponse[]
  >([]);
  const [bshTravelCategory, setbshTravelCategory] = useState<
    ICategoryResponse[]
  >([]);
  const [bshTravelType, setbshTravelType] = useState<ICategoryResponse[]>([]);

  useEffect(() => {
    getInsuranceCategory(ECategory.DOMESTIC_TRAVEL_PACKAGE, {
      source: EInsuranceSource.PVI,
    }).then((res) => setpviTravelCategory(res));
    getInsuranceCategory(ECategory.DOMESTIC_TRAVEL_PACKAGE, {
      source: EInsuranceSource.BIC,
    }).then((res) => setbicTravelCategory(res));
    getInsuranceCategory(ECategory.DOMESTIC_TRAVEL_PACKAGE, {
      source: EInsuranceSource.BSH,
    }).then((res) => setbshTravelCategory(res));
    getInsuranceCategory(ECategory.DOMESTIC_TRAVEL_TYPE, {
      source: EInsuranceSource.BSH,
    }).then((res) => setbshTravelType(res));
  }, []);

  const suppliers = [
    ...(insuranceServicesValue.features.find(
      (item) => item.feature === EInsuranceFeature.TRAVEL_01
    )?.sources || []),
  ];

  const travelCategory = useMemo(
    () =>
      ({
        [EInsuranceSource.BIC]: bicTravelCategory,
        [EInsuranceSource.PVI]: pviTravelCategory,
        [EInsuranceSource.BSH]: bshTravelCategory,
      }[insuranceData.source]),
    [
      pviTravelCategory,
      bicTravelCategory,
      bshTravelCategory,
      insuranceData.source,
    ]
  );

  const travelType = bshTravelType;

  const packageName = useMemo(
    () =>
      travelCategory?.find(
        (pack) => pack.Value === insuranceData[insuranceData.source]?.package
      )?.Text,
    [
      travelCategory,
      insuranceData.source,
      insuranceData[insuranceData.source]?.package,
    ]
  );
  console.log(travelCategory);
  console.log(travelType);
  return (
    <div key={`currentStep_${currentStep}`}>
      <RegisterInsuranceStepV2 step={(currentStep + 1) as 1} />
      <div style={{ padding: "12px 18px 0px 18px" }}>
        <CustomTitle title="Nội dung bảo hiểm" />
      </div>
      <Box className="p-4 pb-44">
        {
          <>
            <CSuplier
              insuranceData={insuranceData}
              setInsuranceData={setInsuranceData}
              type={EInsuranceFeature.TRAVEL_01}
            />
          </>
        }
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
          label="Chọn gói bảo hiểm"
          options={travelCategory}
          value={insuranceData[insuranceData.source]?.package}
        />
        {insuranceData.source == EInsuranceSource.BSH && (
          <CustomSelectV3
            onChange={(value) =>
              setInsuranceData((insurance) => ({
                ...insurance,
                [insuranceData.source]: {
                  ...insuranceData[insuranceData.source],
                  type: value?.Value,
                },
              }))
            }
            label="Loại bảo hiểm"
            options={travelType}
            value={insuranceData[insuranceData.source]?.type}
          />
        )}
        <Sheet
          visible={isVisibleBenefit}
          onClose={() => setisVisibleBenefit(false)}
          autoHeight
          mask
          handler
          swipeToClose
        >
          <div className="px-6 pb-6">
            <Text.Title className="text-center font-semibold text-blue-600">{`Quyền lợi bảo hiểm gói ${packageName}`}</Text.Title>
            <Text.Title className="pt-4 font-semibold ">
              {`Số tiền bảo hiểm: ${formatter.format(
                travelPackageFee?.values[0] || 0
              )}`}
            </Text.Title>
            <Text className="py-2 font-semibold">Tử vong</Text>
            <BenefitLine
              items={[
                {
                  title: "Do tai nạn",
                  value: "100% số tiền BH",
                },
                {
                  title: "Do ốm đau bệnh tật",
                  value: "50% số tiền BH",
                },
              ]}
            />
            <Text className="py-2 font-semibold">Thương tật</Text>
            <BenefitLine
              items={[
                {
                  title: "Vĩnh viện do tai nạn",
                  value: "Chi trả theo tỉ lệ",
                },
                {
                  title: "Tạm thời do tai nạn",
                  value: "Thanh toán chi phí thực tế",
                },
              ]}
            />
          </div>
        </Sheet>
        <Box className="mt-2">
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
          <CSubTitlte title="Tối đa 100 người" />
        </Box>
        <CustomTitle title="Thời hạn bảo hiểm" />
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
          <CSubTitlte title="Tối đa 180 ngày" />
        </Box>
        <FlexBox className="pb-4 mt-2">
          <div className="pr-2 w-50">
            <CustomDatePickerV2
              onChange={(e, e1) => {
                const selectedDate = moment(
                  e1,
                  DEFAULT_FORMAT_DATE
                ).toISOString();
                setInsuranceData((insurance) => ({
                  ...insurance,
                  startDate: selectedDate,
                }));
              }}
              label="Từ ngày"
              value={insuranceData.startDate}
              disabledDate={(date) => {
                return date < moment().startOf("day");
              }}
            />
          </div>
          <div className="pl-2 w-50" style={{ pointerEvents: "none" }}>
            <CustomDatePickerV2
              disabled={true}
              onChange={(e, e1) => {}}
              label="Đến ngày"
              value={
                new Date(
                  moment(insuranceData.startDate)
                    .startOf("days")
                    .add(insuranceData.duration - 1, "days")
                    .toISOString()
                )
              }
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
