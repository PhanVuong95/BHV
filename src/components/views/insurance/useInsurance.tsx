import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { useRecoilState } from "recoil";
import { EInsuranceFeature } from "../../../enums/insurance";
import useRole from "../../../hooks/useRole";
import {
  ICreateAutoInsuranceParams,
  ICreateMotorInsuranceParams,
  IInsuranceFeeDetails,
  IInsuranceResponse,
} from "../../../interfaces/insurance";
import { IPaymentTransaction } from "../../../interfaces/payment";
import {
  createInsuranceRequest,
  getAvailableVoucher,
  getInsuranceFee,
  updateInsuranceRequest,
} from "../../../services/insurance";
import { IVoucher } from "../../../services/referrer";
import { insuranceServicesState, referrerState } from "../../../state";

type Props<T> = {
  defaultInsuranceData: T;
  feature: EInsuranceFeature;
};

function useInsurance<
  T = ICreateMotorInsuranceParams | ICreateAutoInsuranceParams
>({ defaultInsuranceData, feature }: Props<T>) {
  const [insuranceServicesValue, setinsuranceServicesValue] = useRecoilState(
    insuranceServicesState
  );
  const { addToast } = useToasts();
  const { userData } = useRole();
  const navigate = useNavigate();
  const [step, setStep] = useState<0 | 1 | 2 | 3>(
    insuranceServicesValue.insuranceEditting ? 1 : 0
  );
  const [loadingFeeDetails, setloadingFeeDetails] = useState<boolean>(false);
  const [currentInsuranceEditting, setcurrentInsuranceEditting] = useState<
    IInsuranceResponse | undefined
  >(insuranceServicesValue?.insuranceEditting);
  const [referrerValue] = useRecoilState(referrerState);
  const [feeDetails, setfeeDetails] = useState<IInsuranceFeeDetails>({
    discount: 0,
    fee: {
      compulsory: 0,
      total: 0,
      voluntary: 0,
    },
  });
  const [loadingInsuranceRequest, setLoadingInsuranceRequest] = useState(false);
  const [paymentIntent, setPaymentIntent] = useState<
    IPaymentTransaction | undefined
  >();

  const [insuranceData, setInsuranceData] = useState<T>(
    insuranceServicesValue.insuranceEditting
      ? (insuranceServicesValue.insuranceEditting.data as T)
      : {
          ...defaultInsuranceData,
          // userName: userData.name || "",
          // phone: userData.phone?.includes("-") ? "" : userData.phone || "",
          userName: "",
          phone: "",
          startDate: new Date(),
        }
  );

  useEffect(() => {
    if (insuranceServicesValue.insuranceEditting) {
      setinsuranceServicesValue((data) => ({
        ...data,
        insuranceEditting: undefined,
      }));
    }
  }, [insuranceServicesValue]);

  const [availableVouchers, setavailableVouchers] = useState<IVoucher[]>([]);

  useEffect(() => {
    if (!referrerValue?.referrerId || !insuranceData) return;
    getAvailableVoucher(feature, referrerValue.referrerId).then((res: any) => {
      setavailableVouchers(res?.docs);

      if (
        (insuranceData as any)?.discountCode &&
        !res.docs.find(
          (item) => item.code === (insuranceData as any).discountCode
        )
      ) {
        setInsuranceData((data) => ({ ...data, discountCode: "" }));
      }
    });
  }, [(insuranceData as any)?.discountCode, referrerValue]);

  const handleGetInsuranceFee = useCallback(
    debounce((insuranceData: T) => {
      if (!insuranceData || loadingFeeDetails) return;
      setloadingFeeDetails(true);
      getInsuranceFee(
        feature as any,
        {
          ...insuranceData,
          referrerId: referrerValue.referrerId,
        } as any
      )
        .then((res) => {
          setfeeDetails(res);
        })
        .finally(() => {
          setloadingFeeDetails(false);
        });
    }, 1000),
    [loadingFeeDetails, referrerValue]
  );

  useEffect(() => {
    handleGetInsuranceFee(insuranceData);
  }, [insuranceData, referrerValue]);

  const handleCreateInsuranceRequest = async () => {
    setLoadingInsuranceRequest(true);
    if (currentInsuranceEditting) {
      updateInsuranceRequest(
        currentInsuranceEditting.id,
        feature as any,
        {
          ...insuranceData,
          referrerId: referrerValue.referrerId,
        } as any
      )
        .then((res) => {
          setPaymentIntent(res.paymentIntent);
          setStep(3);
        })
        .catch((error) => {
          console.error(error);
          setInsuranceData((data) => ({ ...data, discountCode: "" }));
          addToast("Không thể cập nhật vì bảo hiểm này đã có thay đổi", {
            autoDismiss: true,
            appearance: "error",
          });

          navigate(-1);
        })
        .finally(() => {
          setLoadingInsuranceRequest(false);
        });
    } else {
      createInsuranceRequest(
        feature as any,
        {
          ...insuranceData,
          referrerId: referrerValue.referrerId,
        } as any
      )
        .then((res) => {
          setPaymentIntent(res.paymentIntent);
          setStep(3);
        })
        .catch((error) => {
          console.error(error);
          setInsuranceData((data) => ({ ...data, discountCode: "" }));
          addToast("Đã hết mã giảm giá", {
            autoDismiss: true,
            appearance: "error",
          });
        })
        .finally(() => {
          setLoadingInsuranceRequest(false);
        });
    }
  };

  return {
    feeDetails,
    loadingFeeDetails,
    insuranceData,
    setInsuranceData,
    step,
    setStep,

    loadingInsuranceRequest,
    paymentIntent,

    handleCreateInsuranceRequest,
    availableVouchers,
  };
}

export default useInsurance;
