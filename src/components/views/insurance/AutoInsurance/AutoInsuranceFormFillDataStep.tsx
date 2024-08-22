import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";

import { Box, DatePicker, Select, Text, Switch } from "zmp-ui";
import {
  EAutoUserIntentValue,
  ECategory,
  EInsuranceFeature,
  EInsuranceSource,
} from "../../../../enums/insurance";
import {
  IAutoTypeResponse,
  ICategoryResponse,
  ICreateAutoInsuranceParams,
  IInsuranceFeeDetails,
} from "../../../../interfaces/insurance";
import {
  getAutoInsuranceCategoryCode,
  getInsuranceCategory,
} from "../../../../services/insurance";
import { insuranceServicesState } from "../../../../state";
import FlexBox from "../../../common/FlexBox";
import LayoutHeader from "../../../layouts/LayoutHeader";
import RegisterInsuranceStep from "../RegisterInsuranceStep";
import { pick } from "lodash";
import {
  composeValidator,
  isEmailValid,
  isEmpty,
  isGTE,
  isIdentityCardNumValid,
  isLTE,
  isStartDateValid,
  isValidPhoneNumber,
  validateStringLengthChasisNumber,
} from "../../../../helpers/validator";
import { useRecoilValue } from "recoil";
import { IVoucher } from "../../../../services/referrer";
import CheckSvg from "../../../svgs/CheckSvg";
import ProtectIcon from "../../../svgs/ProtectIcon";
import useFormatter from "../../../../hooks/useFormatter";
import { SuppilerLogos } from "../Suppliers";
import SelectVoucher from "../SelectVoucher";
import Footer from "../Footer";
import CustomInput from "../../../common/CustomInput";
import AutoMakerForm from "./AutoMaker";
import CustomValidatePhone from "../../../CustomValidatePhone";
import CustomValidateEmail from "../../../CustomValidateEmail";
import CustomValidateIdCard from "../CustomValidateIdCard";
import RegisterInsuranceStepV2 from "./RegisterInsuranceStepV2";
import CustomSelectV3 from "../../../select/CustomSelectV3";
import { IconTNDSBB } from "../../../svgs/ChevronRightSvg";
import InfomationContact from "../../../common/Contact/InfomationContact";
import CustomTitle from "../../../Title/CustomTitle";
import CSuplier from "../../../select/CSuplier";
import CustomDatePickerV2 from "../../../common/DatePicker/CustomDatePickerV2";
export const DEFAULT_FORMAT_DATE = "DD/MM/YYYY";
const { Option } = Select;
export const AutoInsuranceFormFillDataStep = ({
  insuranceData,
  setInsuranceData = () => {},
  setStep = () => {},
  feeDetails,
  loadingFeeDetails,
  availableVouchers,
}: {
  insuranceData: ICreateAutoInsuranceParams;
  setInsuranceData?: React.Dispatch<
    React.SetStateAction<ICreateAutoInsuranceParams>
  >;
  setStep?: React.Dispatch<React.SetStateAction<number>>;
  feeDetails: IInsuranceFeeDetails;
  loadingFeeDetails: boolean;
  availableVouchers: IVoucher[];
}) => {
  const [active, setActive] = useState<boolean>(true);
  const { fee, discount, directReferrer } = feeDetails;
  const insuranceServicesValue = useRecoilValue(insuranceServicesState);
  const [currentStep, setcurrentStep] = useState(1);
  const [activeValidate, setActiveValidate] = useState<boolean>(false);

  const [userIntent, setuserIntent] = useState<ICategoryResponse[]>([]);
  const [micAutoTypes, setmicAutoTypes] = useState<IAutoTypeResponse[]>([]);
  const [pviAutoTypes, setpviAutoTypes] = useState<ICategoryResponse[]>([]);
  const [vbiAutoTypes, setvbiAutoTypes] = useState<ICategoryResponse[]>([]);
  const [vbiUserItent, setvbiUserIntent] = useState<ICategoryResponse[]>([]);
  const [bshAutoTypes, setbshAutoTypes] = useState<ICategoryResponse[]>([]);
  const [bshUserItent, setbshUserIntent] = useState<ICategoryResponse[]>([]);
  const [bshAutoGroup, setbshAutoGroup] = useState<ICategoryResponse[]>([]);

  const { formatter } = useFormatter();

  useEffect(() => {
    setmicAutoTypes([]);
    getInsuranceCategory(ECategory.MDSD_AUTO, {
      source: insuranceData.source,
    }).then((res) => setuserIntent(res));
    getInsuranceCategory<IAutoTypeResponse>(ECategory.AUTO_TYPE).then((res) =>
      setmicAutoTypes(res)
    );
  }, [insuranceData.source]);

  useEffect(() => {
    setpviAutoTypes([]);
    getAutoInsuranceCategoryCode(insuranceData.userIntent).then((res) => {
      setpviAutoTypes(res);
    });
  }, [JSON.stringify(pick(insuranceData, ["userIntent"]))]);

  useEffect(() => {
    setvbiAutoTypes([]);
    setvbiUserIntent([]);
    getInsuranceCategory(ECategory.AUTO_TYPE, {
      source: EInsuranceSource.VBI,
    }).then((res) => setvbiAutoTypes(res));
    getInsuranceCategory(ECategory.MDSD_VBI_AUTO, {
      source: EInsuranceSource.VBI,
    }).then((res) => setvbiUserIntent(res));
    getInsuranceCategory(ECategory.MDSD_BSH_AUTO, {
      source: EInsuranceSource.BSH,
    }).then((res) => setbshUserIntent(res));
  }, [insuranceData.source]);

  const suppliers = [
    ...(insuranceServicesValue.features.find(
      (item) => item.feature === EInsuranceFeature.AUTO_01
    )?.sources || []),
  ];

  const seatRange = useMemo(
    () =>
      (insuranceData[insuranceData.source].type &&
        micAutoTypes.find(
          (type) => type.Value === insuranceData[insuranceData.source].type
        )?.seatRange) ||
      {},
    [insuranceData[insuranceData.source].type, micAutoTypes]
  );

  const needVehicleLoad = [
    EAutoUserIntentValue.H_K,
    EAutoUserIntentValue.H,
    EAutoUserIntentValue.KD,
    EAutoUserIntentValue.KKD,
  ].includes(insuranceData.userIntent as any);

  const autoTypes = {
    [EInsuranceSource.PVI]: pviAutoTypes,
    [EInsuranceSource.MIC]: micAutoTypes.filter((type) =>
      type.userIntents.includes(insuranceData.userIntent as any)
    ),
    [EInsuranceSource.VBI]: vbiAutoTypes,
    [EInsuranceSource.BSH]: bshAutoTypes,
  };
  const autoGroups = bshAutoGroup;
  let customOption = userIntent;
  if (insuranceData.source == EInsuranceSource.VBI) {
    customOption = vbiUserItent;
  }
  if (insuranceData.source == EInsuranceSource.BSH) {
    customOption = bshUserItent;
  }
  if (currentStep === 1)
    return (
      <>
        <RegisterInsuranceStepV2 step={1} />
        <div className="p-4 pb-24" key={insuranceData.source}>
          <div className="">
            <div style={{ marginBottom: 12 }}>
              <CustomTitle title="Nội dung bảo hiểm" />
            </div>
            {
              <>
                <CSuplier
                  insuranceData={insuranceData}
                  setInsuranceData={setInsuranceData}
                  type={EInsuranceFeature.AUTO_01}
                />
              </>
            }
            <CustomSelectV3
              onChange={(value) => {
                setInsuranceData((insurance) => ({
                  ...insurance,
                  userIntent: value?.Value as EAutoUserIntentValue,
                  type: "",
                  vehicleLoad: 0,
                  [insuranceData.source]: insuranceData.source ==
                    EInsuranceSource.BSH && { type: "" },
                }));
                if (insuranceData.source == EInsuranceSource.MIC) {
                  console.log(
                    micAutoTypes.filter((type) =>
                      type.userIntents.includes(insuranceData.userIntent as any)
                    )[0].Value
                  );
                  setInsuranceData((insurance) => ({
                    ...insurance,
                    [insuranceData.source]: {
                      ...insuranceData[insuranceData.source],
                      type: micAutoTypes.filter((type) =>
                        type.userIntents.includes(
                          insuranceData.userIntent as any
                        )
                      )[0].Value,
                    },
                  }));
                  if (
                    insuranceData.userIntent == EAutoUserIntentValue.H ||
                    insuranceData.userIntent == EAutoUserIntentValue.H_K
                  ) {
                    setInsuranceData((insurance) => ({
                      ...insurance,
                      vehicleLoad: 2000,
                    }));
                  } else {
                    setInsuranceData((insurance) => ({
                      ...insurance,
                      vehicleLoad: 0,
                    }));
                  }
                }
                if (insuranceData.source == EInsuranceSource.BSH) {
                  getInsuranceCategory(ECategory.LOAIXEAUTO, {
                    source: EInsuranceSource.BSH,
                    userIntent: value?.Value,
                  }).then((res) => setbshAutoGroup(res));
                }
              }}
              label="Mục đích sử dụng xe (*)"
              options={customOption}
              value={insuranceData.userIntent}
            />
            {insuranceData.source == EInsuranceSource.BSH && (
              <CustomSelectV3
                disabled={!insuranceData.userIntent}
                value={insuranceData[insuranceData.source].group || ""}
                onChange={(value) => {
                  setInsuranceData((insurance) => ({
                    ...insurance,
                    [insuranceData.source]: {
                      ...insuranceData[insuranceData.source],
                      group: value?.Value,
                      type: "",
                    },
                  }));
                  if (insuranceData.source == EInsuranceSource.BSH) {
                    getInsuranceCategory(ECategory.AUTO_TYPE, {
                      source: EInsuranceSource.BSH,
                      userIntent: insuranceData.userIntent,
                      selectedValue: value?.Value,
                    }).then((res) => setbshAutoTypes(res));
                  }
                }}
                label="Nhóm xe (*)"
                options={autoGroups}
              />
            )}
            <CustomSelectV3
              disabled={!insuranceData.userIntent}
              value={insuranceData[insuranceData.source].type || ""}
              onChange={(value) =>
                setInsuranceData((insurance) => ({
                  ...insurance,
                  [insuranceData.source]: {
                    ...insuranceData[insuranceData.source],
                    type: value?.Value,
                  },
                }))
              }
              label="Loại xe (*)"
              options={autoTypes[insuranceData.source]}
            />

            <CustomInput
              label={`Số chỗ ngồi (*)`}
              type="text"
              placeholder="Nhập số chỗ ngồi"
              className="text-base mt-2 block"
              required
              value={`${insuranceData.seats}`}
              onChange={(e) =>
                setInsuranceData((insurance) => ({
                  ...insurance,
                  seats: Number(e.target.value.replace(/[^\d]/g, "")),
                }))
              }
              errorText={
                composeValidator(
                  [isEmpty, isLTE, isGTE],
                  activeValidate,
                  insuranceData.seats,
                  seatRange
                ).message
              }
              status={
                composeValidator(
                  [isEmpty, isLTE, isGTE],
                  activeValidate,
                  insuranceData.seats,
                  seatRange
                ).status
              }
            />
            {needVehicleLoad && (
              <CustomInput
                label={`Trọng tải - KG (*)`}
                type="text"
                placeholder="Nhập trọng tải"
                className="text-base mt-2 block"
                required
                value={`${insuranceData.vehicleLoad || 0}`}
                onChange={(e) =>
                  setInsuranceData((insurance) => ({
                    ...insurance,
                    vehicleLoad: Number(e.target.value.replace(/[^\d]/g, "")),
                  }))
                }
                errorText={
                  composeValidator(
                    [isEmpty, isLTE, isGTE],
                    activeValidate,
                    insuranceData.vehicleLoad,
                    { min: 100 }
                  ).message
                }
                status={
                  insuranceData.vehicleLoad
                    ? composeValidator(
                        [isEmpty, isLTE, isGTE],
                        activeValidate,
                        insuranceData.vehicleLoad,
                        { min: 100 }
                      ).status
                    : "error"
                }
              />
            )}
          </div>
          <CustomTitle title="Thời hạn bảo hiểm" className="mb-2" />
          <FlexBox className="pb-4">
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
                      .add(insuranceData.expiry, "years")
                      .toISOString()
                  )
                }
              />
            </div>
          </FlexBox>
          <CustomTitle title="Chọn gói bảo hiểm" />
          <div className="mt-4">
            <IconTNDSBB />
          </div>
          <div
            className="p-4"
            style={{ marginTop: 12, boxShadow: "0px 2px 6px 0px #1E5DFC26" }}
          >
            <FlexBox className="justify-between pt-1.5 pb-3">
              <Text.Title className="text-base fw-600">
                Tai nạn người ngồi trên xe
              </Text.Title>
              <Switch
                onChange={(e) =>
                  setInsuranceData((data) => ({
                    ...data,
                    occupantInsurance:
                      insuranceData.occupantInsurance > 0 ? 0 : 10000000,
                  }))
                }
                checked={insuranceData.occupantInsurance > 0}
              />
            </FlexBox>
            {insuranceData.occupantInsurance > 0 && (
              <>
                <div style={{ marginTop: 12 }}>
                  <CustomSelectV3
                    onChange={(value) =>
                      setInsuranceData((insurance) => ({
                        ...insurance,
                        occupantInsurance: Number(value?.Value),
                      }))
                    }
                    label="Mức bảo hiểm"
                    options={[10, 20, 30, 40, 50, 100]
                      .map((item) => item * 1000000)
                      .map((item) => ({
                        Text: `${new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(item)} / người / vụ`,
                        Value: item,
                      }))}
                    value={insuranceData.occupantInsurance}
                  />
                </div>
              </>
            )}
          </div>
          <SelectVoucher
            setInsuranceData={setInsuranceData}
            discount={discount}
            availableVouchers={availableVouchers}
            loadingFeeDetails={loadingFeeDetails}
            insuranceData={insuranceData}
            directReferrer={directReferrer}
          />

          <Footer
            nextContent="Tiếp tục"
            loadingFeeDetails={loadingFeeDetails}
            feeDetails={feeDetails}
            handlePrev={() => {
              setStep((step) => step - 1);
            }}
            handleNext={() => {
              if (
                !insuranceData[insuranceData.source].type ||
                !insuranceData.seats ||
                composeValidator(
                  [isEmpty, isLTE, isGTE],
                  true,
                  insuranceData.seats,
                  seatRange
                ).status === "error" ||
                ([
                  EAutoUserIntentValue.H_K,
                  EAutoUserIntentValue.H,
                  EAutoUserIntentValue.KD,
                  EAutoUserIntentValue.KKD,
                ].includes(insuranceData.userIntent as any) &&
                  composeValidator(
                    [isEmpty, isLTE, isGTE],
                    true,
                    insuranceData.vehicleLoad,
                    { min: 1 }
                  ).status === "error")
              ) {
                setActiveValidate(true);
                // setTimeout(() => setActiveValidate(false), 1000);
              } else if (loadingFeeDetails || !fee?.total) return;
              else setcurrentStep((step) => step + 1);
            }}
          />
        </div>
      </>
    );

  return (
    <>
      <RegisterInsuranceStepV2 step={2} />
      <div className="pb-44">
        <div className="bg-white" style={{ padding: "0px 12px" }}>
          <Text.Title className="font-semibold text-lg pt-4 leading-6 mb-4">
            Thông tin bảo hiểm
          </Text.Title>
          <CustomInput
            placeholder="Nguyễn Văn A"
            label={(<Text className="text-sm"> Tên chủ xe (*)</Text>) as any}
            type="text"
            className="text-base mt-2 block"
            required
            value={insuranceData.userName}
            onChange={(e) =>
              setInsuranceData((insurance) => ({
                ...insurance,
                userName: e.target.value,
              }))
            }
            errorText={
              composeValidator(
                [isEmpty],
                activeValidate,
                insuranceData.userName
              ).message
            }
            status={
              composeValidator(
                [isEmpty],
                activeValidate,
                insuranceData.userName
              ).status
            }
          />

          <CustomInput
            label={
              (<Text className="text-sm"> Địa chỉ thường trú (*)</Text>) as any
            }
            type="text"
            placeholder="Địa chỉ"
            className="text-base mt-2 block"
            required
            value={insuranceData.userAddress}
            onChange={(e) =>
              setInsuranceData((insurance) => ({
                ...insurance,
                userAddress: e.target.value,
              }))
            }
            errorText={
              composeValidator(
                [isEmpty],
                activeValidate,
                insuranceData.userAddress
              ).message
            }
            status={
              composeValidator(
                [isEmpty],
                activeValidate,
                insuranceData.userAddress
              ).status
            }
          />

          <CustomValidateIdCard
            activeValidate={activeValidate}
            insuranceData={insuranceData}
            setInsuranceData={setInsuranceData}
          />
          <CustomInput
            maxLength={12}
            label={(<Text className="text-sm">Biển số xe (*)</Text>) as any}
            type="text"
            placeholder="30V 123.45"
            className="text-base mt-2 block"
            required
            value={insuranceData.licensePlates}
            onChange={(e) =>
              setInsuranceData((insurance) => ({
                ...insurance,
                licensePlates: e.target.value.toUpperCase(),
              }))
            }
            errorText={
              composeValidator(
                [isEmpty],
                activeValidate,
                insuranceData.licensePlates
              ).message
            }
            status={
              composeValidator(
                [isEmpty],
                activeValidate,
                insuranceData.licensePlates
              ).status
            }
          />
          <CustomInput
            label={(<Text className="text-sm">Năm sản xuất (*)</Text>) as any}
            type="text"
            placeholder="2022"
            className="text-base mt-2 block"
            required
            value={insuranceData.mfgDate}
            onChange={(e) =>
              setInsuranceData((insurance) => ({
                ...insurance,
                mfgDate: e.target.value.replace(/[^\d]/g, ""),
              }))
            }
            errorText={
              composeValidator([isEmpty], activeValidate, insuranceData.mfgDate)
                .message
            }
            status={
              composeValidator([isEmpty], activeValidate, insuranceData.mfgDate)
                .status
            }
          />
          <AutoMakerForm
            insuranceData={insuranceData}
            setInsuranceData={setInsuranceData}
            activeValidate={activeValidate}
          />

          <CustomInput
            maxLength={30}
            label={(<Text className="text-sm">Số khung (*)</Text>) as any}
            type="text"
            placeholder=""
            className="text-base mt-2 block"
            value={insuranceData.chassisNumber}
            onChange={(e) => {
              setInsuranceData((insurance) => ({
                ...insurance,
                chassisNumber: e.target.value,
              }));
              // success
            }}
            required
            errorText={
              composeValidator(
                [validateStringLengthChasisNumber],
                activeValidate,
                insuranceData.chassisNumber
              ).message
            }
            status={
              composeValidator(
                [validateStringLengthChasisNumber],
                activeValidate,
                insuranceData.chassisNumber
              ).status
            }
          />
          <CustomInput
            label={(<Text className="text-sm">Số máy (*)</Text>) as any}
            type="text"
            maxLength={30}
            placeholder=""
            className="text-base mt-2 block"
            value={insuranceData.engineNumber}
            required
            onChange={(e) =>
              setInsuranceData((insurance) => ({
                ...insurance,
                engineNumber: e.target.value,
              }))
            }
            errorText={
              composeValidator(
                [validateStringLengthChasisNumber],
                activeValidate,
                insuranceData.engineNumber,
                false
              ).message
            }
            status={
              composeValidator(
                [validateStringLengthChasisNumber],
                activeValidate,
                insuranceData.engineNumber,
                false
              ).status
            }
          />
        </div>
        <Box className="p-4 pt-0 pb-0">
          <InfomationContact />
          <CustomValidatePhone
            activeValidate={activeValidate}
            insuranceData={insuranceData}
            setInsuranceData={setInsuranceData}
          />
          <CustomValidateEmail
            activeValidate={activeValidate}
            insuranceData={insuranceData}
            setInsuranceData={setInsuranceData}
          />
        </Box>
        <Footer
          loadingFeeDetails={loadingFeeDetails}
          feeDetails={feeDetails}
          handlePrev={() => setcurrentStep((step) => Math.max(0, step - 1))}
          handleNext={() => {
            setActiveValidate(true);
            // setTimeout(() => setActiveValidate(false), 1000);
            if (
              composeValidator(
                [isIdentityCardNumValid, isEmpty],
                true,
                insuranceData.identityCardNum
              ).status === "error"
            )
              return;
            if (
              composeValidator(
                [isValidPhoneNumber, isEmpty],
                true,
                insuranceData.phone
              ).status === "error"
            )
              return;
            if (
              composeValidator(
                [isEmailValid, isEmpty],
                true,
                insuranceData.email
              ).status === "error"
            )
              return;
            if (
              composeValidator(
                [validateStringLengthChasisNumber],
                true,
                insuranceData.chassisNumber
              ).status === "error"
            )
              return;
            if (
              composeValidator(
                [validateStringLengthChasisNumber],
                true,
                insuranceData.engineNumber,
                false
              ).status === "error"
            )
              return;
            if (
              composeValidator(
                [isIdentityCardNumValid],
                true,
                insuranceData.identityCardNum
              ).status === "error"
            )
              return;
            if (
              Object.values(
                pick(insuranceData[insuranceData.source], [
                  "automaker",
                  "label",
                ])
              ).every(
                (item) =>
                  composeValidator([isEmpty], true, item).status === "error"
              )
            )
              return;
            if (
              Object.values(
                pick(insuranceData, [
                  "userAddress",
                  "userName",
                  "licensePlates",
                  "mfgDate",
                ])
              ).every(
                (item) =>
                  composeValidator([isEmpty], true, item).status === "success"
              )
            ) {
              setActiveValidate(false);
              setStep((step) => step + 1);
            }
          }}
        />
      </div>
    </>
  );
};
