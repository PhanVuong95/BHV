import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Button, Icon, Page, Text, useNavigate } from "zmp-ui";
import CustomButton from "../../../components/common/CustomButton";
import Empty from "../../../components/common/Empty";
import FlexBox from "../../../components/common/FlexBox";
import InsurancePdf from "../../../components/common/InsurancePdf";
import Loading from "../../../components/common/Loading";
import LayoutHeader from "../../../components/layouts/LayoutHeader";
import { ProtectSvg } from "../../../components/svgs/ProtectSvg";
import {
  AutoInsuranceFormConfirmData,
  CancerInsuranceFormConfirmData,
  DomesticTravelInsuranceFormConfirmData,
  FireInsuranceFormConfirmData,
  HealthInsuranceFormConfirmData,
  HomeInsuranceFormConfirmData,
  ExtendedAccidentInsuranceFormConfirmData,
  MotorInsuranceFormConfirmData,
  OverseaTravelInsuranceFormConfirmData,
  PersonalAccidentInsuranceFormConfirmData,
  BHXHInsuranceFormConfirmData,
  StudentInsuranceFormConfirmData,
  
} from "../../../components/views/insurance/InsuranceFormConfirmStep";
import PaymentIntent from "../../../components/views/insurance/PaymentIntent";
import { EInsuranceFeature } from "../../../enums/insurance";
import withLogin from "../../../hooks/withLogin";

import { IInsuranceResponse } from "../../../interfaces/insurance";
import { getInsuranceById, retryPay } from "../../../services/insurance";
import { openUrlInWebview } from "../../../services/zalo";
import { insuranceServicesState } from "../../../state";
import { OtherInsuranceFormConfirmData } from "../../../components/views/insurance/InsuranceFormConfirmStep/Other";

const TransactionDetailsPage = () => {
  const [loading, setloading] = useState(true);
  const { insuranceId } = useParams();
  const navigate = useNavigate();
  const insuranceServices = useRecoilValue(insuranceServicesState);

  const [pdf, setPdf] = useState<string | undefined>();
  const [paymentIntent, setpaymentIntent] = useState<any>();
  const [loadingRetryPay, setloadingRetryPay] = useState<boolean>(false);
  const [insurance, setinsurance] = useState<IInsuranceResponse | undefined>();

  useEffect(() => {
    getInsuranceById(String(insuranceId))
      .then((res) => setinsurance(res))
      .finally(() => setloading(false));
  }, [insuranceId]);

  const feature =
    insurance &&
    insuranceServices.features.find(
      (item) => item.feature === insurance.feature
    );

  if (!insurance && loading) return <Loading />;
  if (!insurance && !loading)
    return <Empty className="mt-10" description="Bảo hiểm không tồn tại" />;

  if (paymentIntent)
    return (
      <PaymentIntent step={step}
        paymentIntent={paymentIntent}
        setStep={() => setpaymentIntent("")}
      />
    );

  if (insurance)
    return (
      <Page className="page ">
        <div className="body pb-24 pt-11">
          <LayoutHeader
            showBackIcon
            onBackClick={() => {
              if (pdf) {
                setPdf("");
              } else {
                navigate("/insurance");
              }
            }}
          />
          {(pdf && (
            <>
              <InsurancePdf
                src={pdf}
                transactionId={insurance.transactionId}
                maxHeight="calc(100vh - 190px)"
              />

              <FlexBox className="fixed bottom-0 left-0 z-10 w-full justify-around p-4 border-t bg-white">
                <div
                  className="bg-cyan-500 items-center flex text-white pl-4 pr-4 pt-1 pb-1"
                  style={{ borderRadius: 20, width: "max-content" }}
                  onClick={() => openUrlInWebview(pdf)}
                >
                  <Icon icon="zi-download" />
                  <Text className="pl-1">Tải xuống</Text>
                </div>

                <div
                  className="items-center flex pl-4 pr-4 pt-1 pb-1 border"
                  style={{ borderRadius: 20, width: "max-content" }}
                  onClick={() => setPdf("")}
                >
                  <Icon icon="zi-close" />
                  <Text className="pl-1">Đóng</Text>
                </div>
              </FlexBox>
            </>
          )) || (
            <>
              <FlexBox className="bg-white p-4 items-center justify-between border-b">
                <FlexBox className="items-center">
                  <ProtectSvg className="mr-4" />
                  <div className="w-44">
                    <Text className="font-medium text-lg leading-6">
                      {feature?.title}
                    </Text>
                    <Text className="font-normal text-xs leading-4 text-gray-500">
                      {feature?.description}
                    </Text>
                  </div>
                </FlexBox>
                {!insurance.createBody && (
                  <>
                    <Text className="rounded-2xl p-1 pl-2 pr-2 bg-yellow-100 text-xs text-yellow-600 mt-1">
                      Chưa thanh toán
                    </Text>

                    <FlexBox className="fixed bottom-0 left-0 z-10 w-full justify-around p-4 border-t bg-white">
                      <CustomButton
                        content="Quay lại"
                        className="bg-gray-100 text-gray-900 rounded-2xl"
                        onClick={() => navigate(-1)}
                      />
                      <CustomButton
                        content="Thanh toán"
                        className="rounded-2xl"
                        onClick={() => {
                          setpaymentIntent(null);
                          setloadingRetryPay(true);

                          retryPay(String(insuranceId))
                            .then((res) => {
                              setpaymentIntent(res.paymentIntent);
                              setinsurance(res.insuranceDraft);
                            })
                            .finally(() => {
                              setloadingRetryPay(false);
                            });
                        }}
                      />
                    </FlexBox>
                  </>
                )}
                {insurance.createBody &&
                  insurance.createResponse.success &&
                  !insurance.callbackResponse && (
                    <>
                      <Text className="rounded-2xl p-1 pl-2 pr-2 bg-yellow-100 text-xs text-yellow-600 mt-1">
                        Đang xử lý
                      </Text>
                      <FlexBox className="fixed bottom-0 left-0 z-10 w-full justify-center p-4 border-t bg-white">
                        <Button type="highlight" className="w-2/3" loading>
                          Đang xử lý
                        </Button>
                      </FlexBox>
                    </>
                  )}
                {insurance.createBody && !insurance.createResponse.success && (
                  <>
                    <Text className="rounded-2xl p-1 pl-2 pr-2 bg-red-100 text-xs text-red-600 mt-1">
                      Có lỗi xảy ra
                    </Text>
                    <FlexBox className="fixed bottom-0 left-0 z-10 w-full justify-center p-4 border-t bg-white">
                      <Button
                        type="highlight"
                        className="w-2/3"
                        onClick={() =>
                          navigate(`/insurance/${insurance.feature}`)
                        }
                      >
                        Thử lại
                      </Button>
                    </FlexBox>
                  </>
                )}
                {insurance.createBody && insurance.callbackResponse && (
                  <>
                    {moment(insurance.data.startDate)
                      .add(insurance.data["expiry"] || 1, "years")
                      .valueOf() > Date.now() && (
                      <Text className="rounded-2xl p-1 pl-2 pr-2 bg-green-100 text-xs text-green-600 mt-1">
                        Đang hoạt động
                      </Text>
                    )}
                    {moment(insurance.data.startDate)
                      .add(insurance.data["expiry"] || 1, "years")
                      .valueOf() < Date.now() && (
                      <Text className="rounded-2xl p-1 pl-2 pr-2 bg-red-100 text-xs text-red-600 mt-1">
                        Hết hạn
                      </Text>
                    )}
                    <FlexBox className="fixed bottom-0 left-0 z-10 w-full justify-center p-4 border-t bg-white">
                      <Button
                        type="highlight"
                        className="w-2/3"
                        onClick={() => {
                          setPdf(
                            insurance.callbackResponse.URL ||
                              insurance.callbackResponse.url
                          );
                        }}
                      >
                        Xem văn bản hợp đồng
                      </Button>
                    </FlexBox>
                  </>
                )}
              </FlexBox>
              <div className="mt-11" />

              {insurance &&
                insurance.feature === EInsuranceFeature.MOTOR_01 && (
                  <MotorInsuranceFormConfirmData
                    insuranceData={insurance.data as any}
                  />
                )}
              {insurance.feature === EInsuranceFeature.AUTO_01 && (
                <AutoInsuranceFormConfirmData
                  insuranceData={insurance.data as any}
                />
              )}
              {insurance.feature === EInsuranceFeature.PERSONAL_01 && (
                <PersonalAccidentInsuranceFormConfirmData
                  insuranceData={insurance.data as any}
                />
              )}
              {insurance.feature === EInsuranceFeature.HOME_01 && (
                <HomeInsuranceFormConfirmData
                  insuranceData={insurance.data as any}
                />
              )}
              {insurance.feature === EInsuranceFeature.TRAVEL_01 && (
                <DomesticTravelInsuranceFormConfirmData
                  insuranceData={insurance.data as any}
                />
              )}
              {insurance.feature === EInsuranceFeature.TRAVEL_02 && (
                <OverseaTravelInsuranceFormConfirmData
                  insuranceData={insurance.data as any}
                />
              )}
              {insurance.feature === EInsuranceFeature.FIRE_01 && (
                <FireInsuranceFormConfirmData
                  insuranceData={insurance.data as any}
                />
              )}
              {insurance.feature === EInsuranceFeature.HEALTH_01 && (
                <HealthInsuranceFormConfirmData
                  insuranceData={insurance.data as any}
                />
              )}
              {insurance.feature === EInsuranceFeature.STUDENT_01 && (
                <StudentInsuranceFormConfirmData
                  insuranceData={insurance.data as any}
                />
              )}
              {insurance.feature === EInsuranceFeature.BHXH_01 && (
                <BHXHInsuranceFormConfirmData
                  insuranceData={insurance.data as any}
                />
              )}
              {insurance.feature === EInsuranceFeature.HEALTH_02 && (
                <CancerInsuranceFormConfirmData
                  insuranceData={insurance.data as any}
                />
              )}

              {insurance.feature === EInsuranceFeature.PERSONAL_02 && (
                <ExtendedAccidentInsuranceFormConfirmData
                  insuranceData={insurance.data as any}
                />
              )}
              {insurance.feature === EInsuranceFeature.OTHER_01 && (
                <OtherInsuranceFormConfirmData
                  insuranceData={insurance.data as any}
                />
              )}
            </>
          )}
        </div>
      </Page>
    );

  return null;
};

export default withLogin(TransactionDetailsPage);
