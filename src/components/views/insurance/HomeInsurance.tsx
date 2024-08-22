import { pick, random } from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { Box, DatePicker, Select, Text, Radio, Sheet } from "zmp-ui";
import {
  ECategory,
  EHomePackageValue,
  EInsuranceFeature,
  EInsuranceSource,
} from "../../../enums/insurance";
import {
  composeValidator,
  isEmailValid,
  isEmpty,
  isIdentityCardNumValid,
  isStartDateValid,
  isValidPhoneNumber,
} from "../../../helpers/validator";
import useFormatter from "../../../hooks/useFormatter";
import {
  ICategoryResponse,
  ICreateHomeInsuranceParams,
  IInsuranceFeeDetails,
  ILocationResponse,
  IProvinceResponse,
} from "../../../interfaces/insurance";
import { getInsuranceCategory } from "../../../services/insurance";
import { IVoucher } from "../../../services/referrer";
import { insuranceServicesState } from "../../../state";
import CollapseWrap from "../../common/Collapse";
import FlexBox from "../../common/FlexBox";
import LayoutHeader from "../../layouts/LayoutHeader";
import CheckSvg from "../../svgs/CheckSvg";
import ProtectIcon from "../../svgs/ProtectIcon";
import { BenefitLine } from "./BenefitLine";
import InsuranceFormConfirmStep, {
  HomeInsuranceFormConfirmData,
} from "./InsuranceFormConfirmStep";
import InsuranceIntro from "./InsuranceIntro";
import PaymentIntent from "./PaymentIntent";
import RegisterInsuranceStep from "./RegisterInsuranceStep";
import useInsurance from "./useInsurance";
import { SuppilerLogos } from "./Suppliers";
import SelectLocation from "./SelectLocation";
import SelectVoucher from "./SelectVoucher";
import Footer from "./Footer";
import CustomInput from "../../common/CustomInput";
import CustomValidatePhone from "../../CustomValidatePhone";
import CustomValidateEmail from "../../CustomValidateEmail";
import CustomValidateIdCard from "./CustomValidateIdCard";
import InfomationContact from "../../common/Contact/InfomationContact";
import RegisterInsuranceStepV2 from "./AutoInsurance/RegisterInsuranceStepV2";
import CustomSelectV3 from "../../select/CustomSelectV3";
import CustomTitle from "../../Title/CustomTitle";
import CustomDatePickerV2 from "../../common/DatePicker/CustomDatePickerV2";
import { DEFAULT_FORMAT_DATE } from "./AutoInsurance/AutoInsuranceFormFillDataStep";
import CSuplier from "../../select/CSuplier";

const { Option } = Select;

export const HomeInsuranceFormFillDataStep = ({
  insuranceData,
  setInsuranceData = () => { },
  setStep = () => { },
  feeDetails,
  loadingFeeDetails,
  availableVouchers,
}: {
  insuranceData: ICreateHomeInsuranceParams;
  setInsuranceData?: React.Dispatch<
    React.SetStateAction<ICreateHomeInsuranceParams>
  >;
  setStep?: React.Dispatch<React.SetStateAction<number>>;
  feeDetails: IInsuranceFeeDetails;
  loadingFeeDetails: boolean;
  availableVouchers: IVoucher[];
}) => {
  const { fee, discount, directReferrer } = feeDetails;
  const [active, setActive] = useState<boolean>(true);
  const { formatter } = useFormatter();
  const insuranceServicesValue = useRecoilValue(insuranceServicesState);
  const [activeValidate, setActiveValidate] = useState<boolean>(false);
  const [currentStep, setcurrentStep] = useState(0);
  const [isVisibleBenefit, setisVisibleBenefit] = useState<boolean>(false);

  const [provinces, setProvinces] = useState<IProvinceResponse[]>([]);
  const [districts, setDistricts] = useState<IProvinceResponse[]>([]);
  const [wards, setWards] = useState<IProvinceResponse[]>([]);
  const [options, setOptions] = useState<ILocationResponse[]>([]);
  const [usesCodes, setUsesCodes] = useState<ICategoryResponse[]>([]);
  const [riskCodes, setRiskCodes] = useState<ICategoryResponse[]>([]);
  const [homePackageCategory, setHomePackageCategory] = useState<
    ICategoryResponse[]
  >([]);

  const { homePackageFee } = fee;

  useEffect(() => {
    getInsuranceCategory(ECategory.MUCDICH_SD).then((res) => setUsesCodes(res));
    getInsuranceCategory(ECategory.MAHIEU_RUIRO).then((res) =>
      setRiskCodes(res)
    );
    getInsuranceCategory<IProvinceResponse>(ECategory.PROVINCE).then((res: any) => {
      res = res.map((itemMap) => {
        return {
          ...itemMap,
          Text: itemMap?.name,
          Value: itemMap?.code
        }
      })
      setProvinces(res);
    });
    getInsuranceCategory(ECategory.HOME_PACKAGES, {
      source: EInsuranceSource.PVI,
    }).then((res) => setHomePackageCategory(res));
  }, []);

  const suppliers = [
    ...(insuranceServicesValue.features.find(
      (item) => item.feature === EInsuranceFeature.HOME_01
    )?.sources || []),
  ];

  const packageName = homePackageCategory.find(
    (pack) => pack.Value === insuranceData.package
  )?.Text;
  if (currentStep === 0) {
    return (
      <div>
        <RegisterInsuranceStepV2 step={1} />
        <Box className="p-4 pb-44">
          <Box className="pb-4">
            <CustomTitle
              title='Nội dung bảo hiểm'
            />
            <div className="mt-2"></div>
            <CSuplier
              insuranceData={insuranceData}
              setInsuranceData={setInsuranceData}
              type={EInsuranceFeature.HOME_01}
            />
            <CustomSelectV3
              onChange={(e) => {
                setInsuranceData((data) => ({
                  ...data,
                  package: e?.Value,
                }))
              }}
              label='Các gói bảo hiểm'
              options={homePackageCategory}
              value={insuranceData.package}
            />
            <div onClick={() => setisVisibleBenefit(true)}>
              <Text className="text-blue-500 italic text-sm">{`Xem quyền lợi bảo hiểm`}</Text>
            </div>
            <Sheet
              visible={isVisibleBenefit}
              onClose={() => setisVisibleBenefit(false)}
              autoHeight
              mask
              handler
              swipeToClose
            >
              <div className="px-6 pb-6">
                <Text.Title className="text-center font-semibold text-blue-600">{`Quyền lợi bảo hiểm ${packageName}`}</Text.Title>

                <BenefitLine
                  items={[
                    {
                      title: "Số tiền bảo hiểm nhà ở",
                      value: formatter.format(homePackageFee?.values[0] || 0),
                    },
                    {
                      title: "Số tiền bảo hiểm tài sản",
                      value: formatter.format(homePackageFee?.values[1] || 0),
                    },
                  ]}
                />
              </div>
            </Sheet>
          </Box>

          <CustomSelectV3
            onChange={(e) => {
              setInsuranceData((data) => ({
                ...data,
                expiry: e?.Value,
              }))
            }}
            label='Thời hạn bảo hiểm'
            options={
              [6, 12].map((itemMap) => {
                return {
                  Value: itemMap,
                  Text: `${itemMap} tháng`
                }
              })
            }
            value={insuranceData.expiry}
          />
          <FlexBox className="pb-4">
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
                value={new Date(
                  moment(insuranceData.startDate)
                    .add(insuranceData.expiry, "month")
                    .toISOString()
                )}
              />
            </div>
          </FlexBox>
          <FlexBox className="justify-between">
            <div className="w-full pt-4">
              <svg width="86" height="20" viewBox="0 0 86 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="0.5" width="85" height="19" rx="1.5" fill="#F4F4FE" />
                <rect x="0.5" y="0.5" width="85" height="19" rx="1.5" stroke="#D0D2F8" />
                <path d="M9.24297 4.6H12.519C13.659 4.6 14.607 5.008 15.363 5.824C16.119 6.628 16.503 7.624 16.503 8.8C16.503 9.976 16.119 10.972 15.363 11.788C14.607 12.592 13.659 13 12.519 13H9.24297V9.388H8.48697V8.428H9.24297V4.6ZM10.359 11.944H12.519C13.371 11.944 14.079 11.644 14.619 11.044C15.159 10.444 15.435 9.7 15.435 8.8C15.435 7.9 15.159 7.156 14.619 6.556C14.079 5.956 13.371 5.656 12.519 5.656H10.359V8.428H12.471V9.388H10.359V11.944ZM20.9809 5.836C20.4049 5.356 20.1169 5.344 20.1169 6.124H19.2409C19.2409 4.516 20.2009 4.3 21.0889 4.936C21.6769 5.416 21.9529 5.428 21.9529 4.66H22.8289C22.8289 6.256 21.8929 6.472 20.9809 5.836ZM22.7209 8.032V7H23.7649V13H22.7209V11.968C22.2049 12.76 21.4489 13.156 20.4529 13.156C19.6129 13.156 18.8929 12.856 18.3049 12.244C17.7169 11.632 17.4169 10.876 17.4169 10C17.4169 9.124 17.7169 8.38 18.3049 7.768C18.8929 7.156 19.6129 6.844 20.4529 6.844C21.4489 6.844 22.2049 7.24 22.7209 8.032ZM20.5849 12.148C21.1969 12.148 21.7009 11.944 22.1089 11.536C22.5169 11.116 22.7209 10.612 22.7209 10C22.7209 9.388 22.5169 8.884 22.1089 8.476C21.7009 8.056 21.1969 7.852 20.5849 7.852C19.9849 7.852 19.4809 8.056 19.0729 8.476C18.6649 8.884 18.4609 9.388 18.4609 10C18.4609 10.612 18.6649 11.116 19.0729 11.536C19.4809 11.944 19.9849 12.148 20.5849 12.148ZM31.6587 6.844C32.4987 6.844 33.2187 7.156 33.8067 7.768C34.3947 8.38 34.6947 9.124 34.6947 10C34.6947 10.876 34.3947 11.632 33.8067 12.244C33.2187 12.856 32.4987 13.156 31.6587 13.156C30.6627 13.156 29.9067 12.76 29.3907 11.968V13H28.3467V4.6H29.3907V8.032C29.9067 7.24 30.6627 6.844 31.6587 6.844ZM31.5267 12.148C32.1267 12.148 32.6307 11.944 33.0387 11.536C33.4467 11.116 33.6507 10.612 33.6507 10C33.6507 9.388 33.4467 8.884 33.0387 8.476C32.6307 8.056 32.1267 7.852 31.5267 7.852C30.9147 7.852 30.4107 8.056 30.0027 8.476C29.5947 8.884 29.3907 9.388 29.3907 10C29.3907 10.612 29.5947 11.116 30.0027 11.536C30.4107 11.944 30.9147 12.148 31.5267 12.148ZM40.9084 8.032V7H41.9524V13H40.9084V11.968C40.3924 12.76 39.6364 13.156 38.6404 13.156C37.8004 13.156 37.0804 12.856 36.4924 12.244C35.9044 11.632 35.6044 10.876 35.6044 10C35.6044 9.124 35.9044 8.38 36.4924 7.768C37.0804 7.156 37.8004 6.844 38.6404 6.844C39.6364 6.844 40.3924 7.24 40.9084 8.032ZM38.7724 12.148C39.3844 12.148 39.8884 11.944 40.2964 11.536C40.7044 11.116 40.9084 10.612 40.9084 10C40.9084 9.388 40.7044 8.884 40.2964 8.476C39.8884 8.056 39.3844 7.852 38.7724 7.852C38.1724 7.852 37.6684 8.056 37.2604 8.476C36.8524 8.884 36.6484 9.388 36.6484 10C36.6484 10.612 36.8524 11.116 37.2604 11.536C37.6684 11.944 38.1724 12.148 38.7724 12.148ZM48.5982 12.244C47.9862 12.856 47.2302 13.156 46.3542 13.156C45.4782 13.156 44.7222 12.856 44.1102 12.244C43.4982 11.632 43.1982 10.888 43.1982 10C43.1982 9.112 43.4982 8.368 44.1102 7.756C44.7222 7.144 45.4782 6.844 46.3542 6.844C47.2302 6.844 47.9862 7.144 48.5982 7.756C49.2102 8.368 49.5222 9.112 49.5222 10C49.5222 10.888 49.2102 11.632 48.5982 12.244ZM46.3542 12.136C46.9542 12.136 47.4582 11.932 47.8662 11.524C48.2742 11.116 48.4782 10.612 48.4782 10C48.4782 9.388 48.2742 8.884 47.8662 8.476C47.4582 8.068 46.9542 7.864 46.3542 7.864C45.7662 7.864 45.2622 8.068 44.8542 8.476C44.4462 8.884 44.2422 9.388 44.2422 10C44.2422 10.612 44.4462 11.116 44.8542 11.524C45.2622 11.932 45.7662 12.136 46.3542 12.136ZM58.7329 8.032V7H59.7649V12.748C59.7649 13.636 59.4649 14.32 58.8649 14.812C58.2649 15.304 57.5449 15.556 56.7049 15.556C55.3609 15.556 54.3529 15.04 53.8609 14.092L54.7729 13.576C55.0969 14.248 55.7569 14.584 56.7289 14.584C57.9769 14.584 58.7329 13.888 58.7329 12.748V11.896C58.2049 12.7 57.4489 13.096 56.4769 13.096C55.6249 13.096 54.8929 12.796 54.3049 12.184C53.7169 11.572 53.4169 10.84 53.4169 9.964C53.4169 9.088 53.7169 8.356 54.3049 7.756C54.8929 7.144 55.6249 6.844 56.4769 6.844C57.4609 6.844 58.2169 7.24 58.7329 8.032ZM58.7329 9.964C58.7329 9.364 58.5289 8.86 58.1209 8.452C57.7129 8.044 57.2089 7.84 56.5969 7.84C55.9849 7.84 55.4809 8.044 55.0729 8.452C54.6649 8.86 54.4609 9.364 54.4609 9.964C54.4609 10.576 54.6649 11.08 55.0729 11.488C55.4809 11.896 55.9849 12.1 56.5969 12.1C57.2089 12.1 57.7129 11.896 58.1209 11.488C58.5289 11.08 58.7329 10.576 58.7329 9.964ZM64.8267 6.184L64.1547 5.272L63.4707 6.184H62.4267L63.6147 4.672H64.6827L65.8707 6.184H64.8267ZM61.9227 7.756C62.5347 7.144 63.2907 6.844 64.1667 6.844C65.0427 6.844 65.7987 7.144 66.4107 7.756C67.0227 8.368 67.3347 9.112 67.3347 10C67.3347 10.888 67.0227 11.632 66.4107 12.244C65.7987 12.856 65.0427 13.156 64.1667 13.156C63.2907 13.156 62.5347 12.856 61.9227 12.244C61.3107 11.632 61.0107 10.888 61.0107 10C61.0107 9.112 61.3107 8.368 61.9227 7.756ZM64.1667 12.136C64.7667 12.136 65.2707 11.932 65.6787 11.524C66.0867 11.116 66.2907 10.612 66.2907 10C66.2907 9.388 66.0867 8.884 65.6787 8.476C65.2707 8.068 64.7667 7.864 64.1667 7.864C63.5787 7.864 63.0747 8.068 62.6667 8.476C62.2587 8.884 62.0547 9.388 62.0547 10C62.0547 10.612 62.2587 11.116 62.6667 11.524C63.0747 11.932 63.5787 12.136 64.1667 12.136ZM66.5067 5.08H65.5587L64.4427 3.604H65.6067L66.5067 5.08ZM75.0454 6.844C76.3894 6.844 77.3014 7.78 77.3014 9.268V13H76.2574V9.304C76.2574 8.38 75.7414 7.84 74.9374 7.84C74.0374 7.84 73.4614 8.428 73.4614 9.664V13H72.4174V9.304C72.4174 8.38 71.9254 7.84 71.1454 7.84C70.2694 7.84 69.6094 8.452 69.6094 9.664V13H68.5654V7H69.6094V7.804C70.0174 7.168 70.6174 6.844 71.3974 6.844C72.2014 6.844 72.7894 7.18 73.1614 7.864C73.5814 7.18 74.2054 6.844 75.0454 6.844Z" fill="#141ED2" />
              </svg>
              <FlexBox className="justify-between  py-3">
                {/* <Text.Title>Ngôi nhà</Text.Title> */}
                <span style={{ fontSize: '12px', color: '#646464' }}>Ngôi nhà</span>

                <span style={{ color: '#2E2E2E', fontSize: '14px' }}>
                  {loadingFeeDetails || !homePackageFee
                    ? "---"
                    : formatter.format(
                      ((homePackageFee.values[0] *
                        homePackageFee?.rate[insuranceData.expiry]) /
                        100) *
                      (1 + homePackageFee.tax) || 0
                    )}
                </span>
              </FlexBox>
              <FlexBox className="justify-between  pb-3">
                {/* <Text.Title>Tài sản bên trong</Text.Title> */}
                <span style={{ fontSize: '12px', color: '#646464' }}>Tài sản bên trong</span>
                <span style={{ color: '#2E2E2E', fontSize: '14px' }}>
                  {loadingFeeDetails || !homePackageFee
                    ? "---"
                    : formatter.format(
                      ((homePackageFee.values[1] *
                        homePackageFee?.rate[insuranceData.expiry]) /
                        100) *
                      (1 + homePackageFee.tax) || 0
                    )}
                </span>
              </FlexBox>
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
            setcurrentStep((step) => step + 1);
          }}
        />
      </div>
    );
  }

  if (currentStep === 1) {
    return (
      <div className="pb-44">
        <LayoutHeader
          showBackIcon={true}
          title={<Text className="text-white">Bảo hiểm nhà tư nhân</Text>}
          onBackClick={() => {
            setcurrentStep((step) => Math.max(0, step - 1) as any);
          }}
        />
        <RegisterInsuranceStepV2 step={1} />

        <Box style={{ paddingTop: 0 }} className="p-4 bg-white pb-0">
          <Text.Title className="font-semibold text-lg leading-6 pt-4 pb-4">
            Thông tin người mua
          </Text.Title>
          <CustomInput
            label={
              (<Text className="text-sm"> Họ tên chủ nhà (*)</Text>) as any
            }
            type="text"
            placeholder="Nguyễn Văn A"
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
            placeholder="Địa chỉ thường trú"
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
        </Box>
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
          handlePrev={() => setStep((step) => Math.max(0, step - 1))}
          handleNext={() => {
            setActiveValidate(true);
            setTimeout(() => setActiveValidate(false), 2000);
            if (
              composeValidator([isValidPhoneNumber, isEmpty], true, insuranceData.phone)
                .status === "error"
            )
              return;
            if (
              composeValidator([isEmailValid, isEmpty], true, insuranceData.email)
                .status === "error"
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
                pick(insuranceData, ["userAddress", "userName"])
              ).every(
                (item) =>
                  composeValidator([isEmpty], true, item).status === "success"
              )
            ) {
              setActiveValidate(false);
              setcurrentStep((step) => step + 1);
            }
          }}
        />
      </div>
    );
  }


  return (
    <div className="pb-44">
      <LayoutHeader
        showBackIcon={true}
        title={<Text className="text-white">Bảo hiểm nhà tư nhân</Text>}
        onBackClick={() => {
          setcurrentStep((step) => Math.max(0, step - 1) as any);
        }}
      />
      <RegisterInsuranceStepV2 step={2} />
      <Box style={{ paddingTop: 0 }} className="p-4 bg-white">
        <Text.Title className="font-semibold text-lg leading-6 pt-4 pb-4 mb-4 ">
          Thông tin nhà
        </Text.Title>
        <CustomSelectV3
          onChange={(value) => {
            setInsuranceData((insurance) => ({
              ...insurance,
              usesCode: String(value?.Value),
            }))
          }}
          label='Mục đích sử dụng (*)'
          options={usesCodes}
          value={insuranceData?.usesCode}
        />

        <CustomSelectV3
          onChange={(value) => {
            setInsuranceData((insurance) => ({
              ...insurance,
              riskCode: String(value?.Value),
            }))
          }}
          label='Bảo hiểm dưới dạng (*)'
          options={riskCodes}
          value={insuranceData?.riskCode}
        />
        <CustomSelectV3
          onChange={(value) => {
            setDistricts([])
            setWards([])
            setInsuranceData((insurance) => ({
              ...insurance,
              province: (value?.Value),
            }))
            const convertData = value?.districts?.map((itemMap) => {
              return {
                ...itemMap,
                Value: itemMap?.code,
                Text: itemMap?.name,
              }
            })
            setDistricts(convertData)
            setWards([])
          }}
          label='Tỉnh/ Thành phố'
          options={provinces}
          value={insuranceData?.province}
        />
        <CustomSelectV3
          onChange={(value) => {
            setInsuranceData((insurance) => ({
              ...insurance,
              district: (value?.Value),
            }))
            const convertData = value?.wards?.map((itemMap) => {
              return {
                ...itemMap,
                Value: itemMap?.code,
                Text: itemMap?.name,
              }
            })
            setWards(convertData)
          }}
          label='Quận/ Huyện'
          options={districts}
          value={insuranceData?.district}
        />
        <CustomSelectV3
          onChange={(value) => {
            setInsuranceData((insurance) => ({
              ...insurance,
              ward: (value?.Value),

            }))
          }}
          label="Phường/ Xã/ Thị trấn"
          options={wards}
          value={insuranceData?.ward}
        />
        <CustomInput
          label={
            (
              <Text className="text-sm"> Số nhà, số tầng, đường (*)</Text>
            ) as any
          }
          type="text"
          placeholder="Số nhà, số tầng,..."
          className="text-base mt-2 block"
          required
          value={insuranceData.address}
          onChange={(e) =>
            setInsuranceData((insurance) => ({
              ...insurance,
              address: e.target.value,
            }))
          }
          errorText={
            composeValidator([isEmpty], activeValidate, insuranceData.address)
              .message
          }
          status={
            composeValidator([isEmpty], activeValidate, insuranceData.address)
              .status
          }
        />

        <CustomInput
          label={(<Text className="text-sm">Năm xây dựng (*)</Text>) as any}
          type="text"
          placeholder="2022"
          className="text-base mt-2 block"
          required
          value={insuranceData.yearBuilt}
          onChange={(e) =>
            setInsuranceData((insurance) => ({
              ...insurance,
              yearBuilt: e.target.value.replace(/[^\d]/g, ""),
            }))
          }
          errorText={
            composeValidator([isEmpty], activeValidate, insuranceData.yearBuilt)
              .message
          }
          status={
            composeValidator([isEmpty], activeValidate, insuranceData.yearBuilt)
              .status
          }
        />
      </Box>

      <Footer
        loadingFeeDetails={loadingFeeDetails}
        feeDetails={feeDetails}
        handlePrev={() => setcurrentStep((step) => Math.max(0, step - 1))}
        handleNext={() => {
          setActiveValidate(true);
          setTimeout(() => setActiveValidate(false), 2000);
          (Object.values(
            pick(insuranceData, [
              "usesCode",
              "riskCode",
              // "locationCode",
              "yearBuilt",
              "address",
            ])
          ).every(
            (item) =>
              composeValidator([isEmpty], true, item).status === "success"
          )
          );
          if (
            composeValidator([isEmailValid], true, insuranceData.email)
              .status === "error"
          ) {
            return
          }
          if (
            composeValidator(
              [isIdentityCardNumValid],
              true,
              insuranceData.identityCardNum
            ).status === "error"
          ) {
            return
          }
          if (
            Object.values(
              pick(insuranceData, [
                "usesCode",
                "riskCode",
                // "locationCode",
                "yearBuilt",
                "address",
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
  );
};

const HomeInsurance = () => {
  const navigate = useNavigate();
  const insuranceServicesValue = useRecoilValue(insuranceServicesState);

  const featureConfig = insuranceServicesValue.features.find(
    (item) => item.feature === EInsuranceFeature.HOME_01
  );

  const {
    loadingFeeDetails,
    feeDetails,
    insuranceData,
    step,
    setStep,
    setInsuranceData,
    handleCreateInsuranceRequest,
    loadingInsuranceRequest,
    paymentIntent,
    availableVouchers,
  } = useInsurance<ICreateHomeInsuranceParams>({
    defaultInsuranceData: {
      ...insuranceServicesValue.defaultHomeData,
      source:
        featureConfig?.sources?.[
        random(0, featureConfig?.sources?.length || 0)
        ] || EInsuranceSource.PVI,
    },
    feature: EInsuranceFeature.HOME_01,
  });

  const thumbnail = featureConfig?.thumbnail || "";
  return (
    <>
      <LayoutHeader
        showBackIcon={true}
        title={<Text className="text-white">Bảo hiểm nhà tư nhân</Text>}
        onBackClick={() => {
          if (step > 0) setStep((step) => Math.max(0, step - 1) as any);
          else {
            navigate("/home");
          }
        }}
      />

      {step === 2 && <RegisterInsuranceStepV2 step={3} />}

      {paymentIntent && step >= 3 && (
        <PaymentIntent step={step} paymentIntent={paymentIntent} setStep={setStep} />
      )}

      <div
        className="section-container"
        style={{
          ...([2, 0].includes(step) && {
            background: "unset",
            paddingBottom: 200,
          }),
          ...(step === 3 && {
            display: "none",
          }),
          marginBottom: 0,
        }}
      >
        <div
          style={{
            display: step === 0 ? "block" : "none",
          }}
          className="animate-fadeIn"
        >
          <img src={thumbnail} alt="Thumbnail-tnds-xe-may" />
          <div className="bg-white mt-2 p-4">
            <CollapseWrap
              title="Bảo hiểm nhà tư nhân"
              showMoreBtn
              content={[
                {
                  type: "text",
                  content:
                    "✓ Cháy (bao gồm sét đánh), Nổ, Lũ lụt, Va chạm với ngôi nhà, trộm cướp",
                },
                {
                  type: "text",
                  content: "✓ Tài sản giá trị theo kê khai của chủ nhà",
                },
                {
                  type: "text",
                  content:
                    "✓ Cấp đơn online nhanh chóng, thuận tiện cho khách hàng lưu trữ",
                },
                {
                  type: "inline-text",
                  content: [
                    {
                      type: "text",
                      content: "✓ Chi trả bồi thường cao nhất lên đến",
                    },
                    {
                      type: "hightlight",
                      content: " 3.000.000.000VNĐ/năm.",
                    },
                  ],
                },

                {
                  type: "inline-text",
                  content: [
                    {
                      type: "text",
                      content: "✓ Bảo hiểm hiệu lực:",
                    },
                    {
                      type: "hightlight",
                      content: " 365 ngày",
                    },
                  ],
                },
              ]}
            />
          </div>

          <div className="bg-white mt-2 p-4">
            <CollapseWrap
              title="Điều kiện - Điều khoản"
              height={0}
              content={[
                { type: "text", content: "Điều kiện áp dụng:" },
                {
                  type: "list",
                  content: [
                    {
                      type: "text",
                      content:
                        "Công dân Việt Nam và người nước ngoài cư trú hợp pháp tại Việt Nam;",
                    },
                    {
                      type: "text",
                      content:
                        "Độ tuổi từ đủ 1 tuổi tối đa đến tròn 70 tuổi tại ngày bắt đầu thời hạn bảo hiểm.",
                    },
                  ],
                },
                {
                  type: "text",
                  content: "Điều khoản:",
                },
                {
                  type: "list",
                  content: [
                    {
                      type: "text",
                      content: "Vui lòng xem chi tiết file điều khoản đính kèm",
                    },
                    {
                      type: "text",
                      content: "Vui lòng liên hệ chúng tôi để được làm rõ",
                    },
                  ],
                },

                {
                  type: "text",
                  content: "Không bồi thường cho các trường hợp như:",
                  className: "mt-4",
                },
                {
                  type: "text",
                  content: "❌ Thiệt hại gây ra do ô nhiễm",
                  className: "pl-6 pt-1",
                },
                {
                  type: "text",
                  content: "❌ Thiệt hại gây ra bởi chiến tranh và khủng bố",
                  className: "pl-6 pt-1",
                },
              ]}
            />
          </div>

          <div className="bg-white mt-2 p-4">
            <CollapseWrap
              title="Phương thức thanh toán"
              height={0}
              content={[
                {
                  type: "text",
                  content: "✓ Trực tiếp tại các cửa hàng (ưu việt nhất)",
                },
                {
                  type: "text",
                  content:
                    "✓ Online qua QRCode vào tài khoản công ty mở tại BIDV",
                },
              ]}
            />
          </div>
          <InsuranceIntro
            feature={EInsuranceFeature.HOME_01}
            setStep={setStep}
            title="Bảo hiểm nhà tư nhân"
            description={`✍️ Lưu trữ Online ngay trên Zalo, cần là có
✍️ Thủ tục chi trả bồi thường đơn giản trong trường hợp gây ra tai nạn cho người khác
✍️ Chia sẻ ngay giúp bạn bè cùng biết`}
            thumbnail={thumbnail}
          />
        </div>
        <div
          style={{
            display: step === 1 ? "block" : "none",
          }}
          className="animate-fadeIn"
        >
          <HomeInsuranceFormFillDataStep
            feeDetails={feeDetails}
            loadingFeeDetails={loadingFeeDetails}
            availableVouchers={availableVouchers}
            insuranceData={insuranceData}
            setInsuranceData={setInsuranceData}
            setStep={setStep}
          />
        </div>
        {step === 2 && (
          <>
            <HomeInsuranceFormConfirmData insuranceData={insuranceData} />
            <InsuranceFormConfirmStep
              insuranceData={insuranceData}
              feeDetails={feeDetails}
              loadingFeeDetails={loadingFeeDetails}
              loadingInsuranceRequest={loadingInsuranceRequest}
              handleCreateInsuranceRequest={handleCreateInsuranceRequest}
              setStep={setStep}
              feature={EInsuranceFeature.HOME_01}
            />
          </>
        )}
      </div>
    </>
  );
};

export default HomeInsurance;
