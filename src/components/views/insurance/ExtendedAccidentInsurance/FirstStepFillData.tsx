import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";

import { Box, DatePicker, Select, Text, Icon, Switch } from "zmp-ui";
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
  ICreateExtendedAccidentInsuranceParams,
  IInsuranceFeeDetails,
} from "../../../../interfaces/insurance";
import { getInsuranceCategory } from "../../../../services/insurance";
import { IVoucher } from "../../../../services/referrer";
import {
  defaultExtendedAccidentAttachPerson,
  insuranceServicesState,
} from "../../../../state";
import FlexBox from "../../../common/FlexBox";
import CheckSvg from "../../../svgs/CheckSvg";

import { SuppilerLogos } from "../Suppliers";
import { openUrlInWebview } from "../../../../services/zalo";
import SelectVoucher from "../SelectVoucher";
import ProtectIcon from "../../../svgs/ProtectIcon";
import CustomInput from "../../../common/CustomInput";
import Footer from "../Footer";
import CustomSelectV3 from "../../../select/CustomSelectV3";
import CustomTitle from "../../../Title/CustomTitle";
import CustomDatePickerV2 from "../../../common/DatePicker/CustomDatePickerV2";
import { DEFAULT_FORMAT_DATE } from "../AutoInsurance/AutoInsuranceFormFillDataStep";
import CSuplier from "../../../select/CSuplier";

const { Option } = Select;

type Props = {
  insuranceData: ICreateExtendedAccidentInsuranceParams;
  setInsuranceData?: React.Dispatch<
    React.SetStateAction<ICreateExtendedAccidentInsuranceParams>
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
    getInsuranceCategory(ECategory.EXTENDED_ACCIDENT_PACKAGES, {
      source: EInsuranceSource.BIC,
    }).then((res) => setbicPackageCategory(res));
  }, []);

  const suppliers = [
    ...(insuranceServicesValue.features.find(
      (item) => item.feature === EInsuranceFeature.PERSONAL_02
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
      <Box className="p-4 pb-44">
        {(
          <>
            <CSuplier
              insuranceData={insuranceData}
              setInsuranceData={setInsuranceData}
              type={EInsuranceFeature.PERSONAL_02}
            />
          </>
        )}

        <Box className="">
          {/* <CustomSelectV3 */}
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
            label='Chọn gói bảo hiểm'
            options={packageCategory}
            value={insuranceData[insuranceData.source].package}
          />
          <div
            onClick={() => {
              if (benefitUrl) openUrlInWebview(benefitUrl);
            }}
          >
            <Text className="text-blue-500 italic text-primary-color">{`Xem quyền lợi bảo hiểm`}</Text>
          </div>
        </Box>
        <Box className="py-4">
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
                  ...new Array(Number(personNum)).fill(
                    defaultExtendedAccidentAttachPerson
                  ),
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
          <FlexBox className="text-gray-500 items-center">
            <Text className="text-xs">Tối đa 100 người</Text>
          </FlexBox>
        </Box>
        {/* <Text.Title className="font-medium text-lg leading-6 pt-4">
          Thời hạn bảo hiểm
        </Text.Title> */}
        <CustomTitle
          className='pt-4'
          title='Thời hạn bảo hiểm'
        />
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
        <CustomTitle
          title='Chọn gói bảo hiểm'
        />
        {/* <FlexBox className="justify-between">
          <div className="w-full pt-2">
            <FlexBox
              className="items-center rounded-md bg-[#2563EB] text-white p-1 pl-2 pr-2 text-xs"
              style={{ width: "max-content" }}
            >
              <ProtectIcon />
              <Text className="pl-1">ĐÃ BAO GỒM</Text>
            </FlexBox>
            <FlexBox className="justify-between pt-1.5 pb-3 border-b ">
              <Text.Title className="text-base">
                Bảo hiểm tử vong hoặc thương tật thân thể do tai nạn
              </Text.Title>
            </FlexBox>
          </div>
        </FlexBox> */}

        {/* {insuranceData.source === EInsuranceSource.BIC && (
          <div className="pt-4">
            <FlexBox className="justify-between">
            
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
              Trợ cấp nằm viện/phẫu thuật do ốm đau, bệnh tật
            </Text.Title>
          </div>
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
