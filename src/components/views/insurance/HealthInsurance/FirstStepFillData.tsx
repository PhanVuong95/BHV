import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import { Box, DatePicker, Select, Text, Icon, Checkbox } from "zmp-ui";
import {
  BSHHealthTypeValue,
  ECategory,
  EInsuranceFeature,
  EInsuranceSource,
  MICHealthPackageValue,
  MICHealthTypeValue,
  MICVTSKHealthPackageValue,
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
  ICreateHealthInsuranceParams,
  IInsuranceFeeDetails,
} from "../../../../interfaces/insurance";
import { getInsuranceCategory } from "../../../../services/insurance";
import { IVoucher } from "../../../../services/referrer";
import {
  defaultHealthAttachPerson,
  insuranceServicesState,
} from "../../../../state";
import FlexBox from "../../../common/FlexBox";
import CheckSvg from "../../../svgs/CheckSvg";

import { SuppilerLogos } from "../Suppliers";
import { openUrlInWebview } from "../../../../services/zalo";
import SelectVoucher from "../SelectVoucher";
import CustomInput from "../../../common/CustomInput";
import Footer from "../Footer";
import CSuplier from "../../../select/CSuplier";
import CustomSelectV3 from "../../../select/CustomSelectV3";
import RegisterInsuranceStepV2 from "../AutoInsurance/RegisterInsuranceStepV2";
import CustomTitle from "../../../Title/CustomTitle";
import CustomDatePickerV2 from "../../../common/DatePicker/CustomDatePickerV2";
import { DEFAULT_FORMAT_DATE } from "../AutoInsurance/AutoInsuranceFormFillDataStep";

const { Option } = Select;

type Props = {
  insuranceData: ICreateHealthInsuranceParams;
  setInsuranceData?: React.Dispatch<
    React.SetStateAction<ICreateHealthInsuranceParams>
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
  buyForSelf: boolean;
  setbuyForSelf: React.Dispatch<React.SetStateAction<boolean>>;
};

const FirstStepFillData = (props: Props) => {
  const {
    insuranceData,
    setInsuranceData = () => {},
    setStep = () => {},
    feeDetails,
    loadingFeeDetails,
    availableVouchers,
    step,
    currentStep,
    setcurrentStep,
    activeValidate,
    setactiveValidate,
    buyForSelf,
    setbuyForSelf,
  } = props;
  insuranceData.startDate = new Date(moment().add(1, "days").toISOString());
  const { fee, discount, directReferrer } = feeDetails;
  const { benefitUrl } = fee;
  const { formatter } = useFormatter();
  const insuranceServicesValue = useRecoilValue(insuranceServicesState);
  const [bicPackageCategory, setbicPackageCategory] = useState<
    ICategoryResponse[]
  >([]);
  const [micPackageCategory, setmicPackageCategory] = useState<
    ICategoryResponse[]
  >([]);
  const [vbiPackageCategory, setvbiPackageCategory] = useState<
    ICategoryResponse[]
  >([]);
  const [bshPackageCategory, setbshPackageCategory] = useState<
    ICategoryResponse[]
  >([]);
  useEffect(() => {
    getInsuranceCategory(ECategory.HEALTH_PACKAGES, {
      source: EInsuranceSource.BIC,
    }).then((res) => setbicPackageCategory(res));
    getInsuranceCategory(ECategory.HEALTH_PACKAGES, {
      source: EInsuranceSource.MIC,
    }).then((res) => setmicPackageCategory(res));
    getInsuranceCategory(ECategory.HEALTH_PACKAGES, {
      source: EInsuranceSource.VBI,
    }).then((res) => setvbiPackageCategory(res));
    getInsuranceCategory(ECategory.HEALTH_PACKAGES, {
      source: EInsuranceSource.BSH,
    }).then((res) => setbshPackageCategory(res));
  }, []);

  const suppliers = [
    ...(insuranceServicesValue.features.find(
      (item) => item.feature === EInsuranceFeature.HEALTH_01
    )?.sources || []),
  ];

  const packageCategory = useMemo(
    () =>
      ({
        [EInsuranceSource.BIC]: bicPackageCategory,
        [EInsuranceSource.MIC]: micPackageCategory,
        [EInsuranceSource.VBI]: vbiPackageCategory,
        [EInsuranceSource.BSH]: bshPackageCategory,
      }[insuranceData.source]),
    [
      bicPackageCategory,
      micPackageCategory,
      vbiPackageCategory,
      bshPackageCategory,
      insuranceData.source,
    ]
  );
  console.log(packageCategory);
  return (
    <div key={`currentStep_${currentStep}`}>
      <RegisterInsuranceStepV2 step={(currentStep + 1) as 1} />
      <div style={{ padding: "12px 18px 0px 18px" }}>
        <CustomTitle title="Nội dung bảo hiểm" />
      </div>
      <Box className="p-4 pb-44">
        <>
          {
            <>
              <CSuplier
                insuranceData={insuranceData}
                setInsuranceData={setInsuranceData}
                type={EInsuranceFeature.HEALTH_01}
              />
            </>
          }
        </>
        {(insuranceData.source == EInsuranceSource.MIC ||
          insuranceData.source == EInsuranceSource.BSH) && (
          <CustomSelectV3
            onChange={(value) =>
              setInsuranceData((insurance) => ({
                ...insurance,

                [insuranceData.source]: {
                  ...insuranceData[insuranceData.source],
                  type: value?.Value,
                  package:
                    value?.Value == MICHealthTypeValue.TYPE_01
                      ? MICHealthPackageValue.BRONZE
                      : MICVTSKHealthPackageValue.PACKAGE_01,
                },
              }))
            }
            options={
              (insuranceData.source == EInsuranceSource.MIC && [
                { Value: MICHealthTypeValue.TYPE_01, Text: "MIC Care" },
                {
                  Value: MICHealthTypeValue.TYPE_02,
                  Text: "MIC Vững tâm sống khỏe",
                },
              ]) ||
              (insuranceData.source == EInsuranceSource.BSH && [
                { Value: BSHHealthTypeValue.TYPE_01, Text: "Tai nạn cá nhân" },
                {
                  Value: BSHHealthTypeValue.TYPE_02,
                  Text: "Tai nạn hộ gia đình",
                },
              ])
            }
            value={insuranceData?.[insuranceData?.source]?.type}
            label="Loại bảo hiểm"
          />
        )}
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
          options={
            insuranceData.source != EInsuranceSource.MIC
              ? packageCategory
              : packageCategory
                  .map((category) => {
                    if (
                      category?.Type == insuranceData[insuranceData.source].type
                    )
                      return {
                        Value: category.Value,
                        Text: category.Text,
                      };
                  })
                  .filter((itemFilter) => itemFilter?.Value)
          }
          value={insuranceData?.[insuranceData?.source]?.package}
          label="Chọn gói bảo hiểm"
        />
        <div
          onClick={() => {
            console.log(benefitUrl);
            if (benefitUrl) openUrlInWebview(benefitUrl);
          }}
        >
          <i className="fs-12 fw-500 text-primary-color">{`Xem quyền lợi bảo hiểm`}</i>
        </div>
        {insuranceData.source == EInsuranceSource.BIC && (
          <Box className="py-4 mt-2">
            <Text.Title className="font-medium text-lg leading-6">
              Số người tham gia bảo hiểm
            </Text.Title>
            <CustomInput
              value={insuranceData.personNum}
              onChange={(e) => {
                const personNum = Math.min(
                  100,
                  Number(e.target.value.replace(/[^\d]/g, ""))
                );
                setInsuranceData((insurance) => ({
                  ...insurance,
                  personNum,
                  over70personNum: personNum,

                  attachedList: [
                    ...insurance.attachedList,
                    ...new Array(Number(personNum)).fill(
                      defaultHealthAttachPerson
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
            <FlexBox className="text-gray-500 items-center pt-2">
              <Icon icon="zi-info-circle-solid" size={16} />
              <Text className="pl-2 text-xs">Tối đa 100 người</Text>
            </FlexBox>
            <FlexBox className="text-gray-500 pt-2">
              <Icon icon="zi-info-circle-solid" size={16} />
              <Text className="pl-2 text-xs">
                Phí BH hiển thị tạm tính cho người tham gia ở độ tuổi 18
              </Text>
            </FlexBox>
            <FlexBox className="text-gray-500 pt-2">
              <Icon icon="zi-info-circle-solid" size={16} />

              <Text className="pl-2 text-xs">
                Phí BH hiển thị tạm tính cho gói cơ bản
              </Text>
            </FlexBox>
            <FlexBox className="text-gray-500 pt-2">
              <Icon icon="zi-info-circle-solid" size={16} />
              <div>
                <Text className="pl-2 text-xs">
                  Phí BH sẽ cập nhật theo tuổi cụ thể của người tham gia BH
                </Text>
                <Text className="pl-2 text-xs">
                  Phí BH sẽ cập nhật khi người tham gia mua thêm gói bổ sung
                </Text>
              </div>
            </FlexBox>
          </Box>
        )}

        <CustomTitle className="pt-4" title="Thời hạn bảo hiểm" />

        <FlexBox className="pb-4 pt-4">
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
                  moment(insuranceData.startDate).add(1, "years").toISOString()
                )
              }
            />
          </div>
        </FlexBox>

        {insuranceData.source != EInsuranceSource.BIC && (
          <Checkbox
            label={
              (
                <Text className="text-xs" style={{ padding: 15, fontSize: 15 }}>
                  Mua Bảo hiểm cho bản thân
                </Text>
              ) as any
            }
            value={0}
            defaultChecked={buyForSelf}
            onChange={(e) => {
              setbuyForSelf(e.target.checked);
              if (e.target.checked) {
                setInsuranceData((data) => ({
                  ...data,
                  attachedList: data.attachedList.map(
                    (item, index) =>
                      (index === 0 && {
                        ...item,
                        fullName: insuranceData.userName,
                        gender: insuranceData.gender,
                        birthday: insuranceData.birthday,
                        address: insuranceData.userAddress,
                        identityCardNum: insuranceData.identityCardNum,
                        phone: insuranceData.phone,
                      }) ||
                      item
                  ),
                }));
              }
            }}
          />
        )}
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
