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
  ICreateStudentInsuranceParams,
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
import CustomDatePickerV2 from "../../../common/DatePicker/CustomDatePickerV2";
import { DEFAULT_FORMAT_DATE } from "../AutoInsurance/AutoInsuranceFormFillDataStep";
import RegisterInsuranceStepV2 from "../AutoInsurance/RegisterInsuranceStepV2";
import CSubTitlte from "../../../CSubTitlte";

const { Option } = Select;

type Props = {
  insuranceData: ICreateStudentInsuranceParams;
  setInsuranceData?: React.Dispatch<
    React.SetStateAction<ICreateStudentInsuranceParams>
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

  const [bicPackageCategory, setbicPackageCategory] = useState<
    ICategoryResponse[]
  >([]);

  useEffect(() => {
    getInsuranceCategory(ECategory.STUDENT_PACKAGES, {
      source: EInsuranceSource.BIC,
    }).then((res) => {
      setbicPackageCategory(res);

      if (
        !res.find(
          (item) =>
            Number(item.Value) ===
            Number(insuranceData[EInsuranceSource.BIC].package)
        )
      ) {
        setInsuranceData((data) => ({
          ...data,
          [EInsuranceSource.BIC]: {
            ...data[EInsuranceSource.BIC],
            package: Number(res?.[0]?.Value),
          },
        }));
      }
    });
  }, []);

  const suppliers = [
    ...(insuranceServicesValue.features.find(
      (item) => item.feature === EInsuranceFeature.STUDENT_01
    )?.sources || []),
  ];

  const packageCategory = useMemo(
    () =>
    ({
      [EInsuranceSource.BIC]: bicPackageCategory,
    }[insuranceData.source]),
    [bicPackageCategory, insuranceData.source]
  );

  return (
    <div key={`currentStep_${currentStep}`}>
      <RegisterInsuranceStepV2 step={1} />
      <Box className="p-4 pb-44">
        <div className="mb-2"> <CustomTitle title='Nội dung bảo hiểm' /></div>
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
            onChange={(value) => {
              setInsuranceData((insurance) => ({
                ...insurance,
                [insuranceData.source]: {
                  ...insuranceData[insuranceData.source],
                  package: value?.Value,
                },
              }))


            }}
            label='Mục đích sử dụng (*)'
            options={packageCategory}
            value={insuranceData?.[insuranceData.source]?.package}
          />
          <div
            onClick={() => {
              if (benefitUrl) openUrlInWebview(benefitUrl);
            }}
          >
            <Text className="text-blue-500 italic text-sm">{`Xem quyền lợi bảo hiểm`}</Text>
          </div>
        </Box>
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
                    schoolName: "",
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
        <CustomTitle
          title='Thời hạn bảo hiểm'
        />
        <FlexBox className="">
          <div className="pr-2 w-50">
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
              value={
                new Date(
                  moment(insuranceData.startDate).add(1, "years").toISOString()
                )
              }
            />
          </div>
        </FlexBox>

        {/* <Text.Title className="font-medium text-lg leading-6 pt-4 pb-2">
          Chọn gói bảo hiểm
        </Text.Title>
        <FlexBox className="justify-between">
          <div className="w-full pt-2">
            <FlexBox
              className="items-center rounded-md bg-[#2563EB] text-white p-1 pl-2 pr-2 text-xs"
              style={{ width: "max-content" }}
            >
              <ProtectIcon />
              <Text className="pl-1">ĐÃ BAO GỒM</Text>
            </FlexBox>
            <FlexBox className="justify-between pt-1.5 pb-3 border-b ">
              <Text.Title className="w-3/5 text-base">
                Bảo hiểm học sinh sinh viên
              </Text.Title>

              <Text.Title>
                {loadingFeeDetails
                  ? "---"
                  : formatter.format(fee?.compulsory || 0)}
              </Text.Title>
            </FlexBox>
          </div>
        </FlexBox> */}

        {/* {insuranceData.source === EInsuranceSource.PVI && (
            <div className="pt-4">
              <FlexBox className="justify-between">
                <FlexBox
                  className="items-center rounded-md bg-[#FFA000] text-white p-1 pl-2 pr-2 text-xs"
                  style={{ width: "max-content" }}
                >
                  <ProtectIcon />
                  <Text className="pl-1">QUYỀN LỢI BỔ SUNG</Text>
                </FlexBox>
                <Switch
                  onChange={(e) =>
                    setInsuranceData((data) => ({
                      ...data,
                      hasComplementary: !data.hasComplementary,
                    }))
                  }
                  checked={insuranceData.hasComplementary}
                />
              </FlexBox>

              <Text.Title className="text-base pt-2">
                Thêm gói bổ sung
              </Text.Title>
            </div>
          )} */}

        {/* {insuranceData.hasComplementary && (
            <>
              <Text.Title className="text-right pt-4">
                {loadingFeeDetails
                  ? "---"
                  : `+ ${formatter.format(fee?.voluntary || 0)}`}
              </Text.Title>
            </>
          )} */}
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

          setactiveValidate(false);
          setcurrentStep((step) => step + 1);
        }}
      />
    </div>
  );
};

export default FirstStepFillData;
