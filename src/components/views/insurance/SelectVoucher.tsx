import React from "react";
import { IVoucher } from "../../../services/referrer";
import { Select, Text } from "zmp-ui";
import useFormatter from "../../../hooks/useFormatter";
import { IUser } from "../../../services/user";
import CustomInput from "../../common/CustomInput";

type Props = {
  availableVouchers: IVoucher[];
  setInsuranceData: React.Dispatch<React.SetStateAction<any>>;
  insuranceData: { discountCode?: string };
  discount?: number;
  loadingFeeDetails: boolean;
  directReferrer?: Partial<IUser>;
};

const SelectVoucher = ({
  availableVouchers,
  setInsuranceData,
  insuranceData,
  discount,
  loadingFeeDetails,
  directReferrer,
}: Props) => {
  const { formatter } = useFormatter();
  return (
    <>
      <div style={{ marginTop: 12 }}></div>
      <CustomInput
        maxLength={8}
        label={
          (
            <Text className="text-sm"> Nhập mã giảm giá</Text>
          ) as any
        }
        type="text"
        placeholder="Nhập mã giảm giá"
        className="text-base mt-2 block"
        required
        value={insuranceData.discountCode}
        onChange={(e) =>
          setInsuranceData((insurance) => ({
            ...insurance,
            discountCode: e.target.value.trimStart() as string,
          }))
        }
      />
    </>
  );
};

export default SelectVoucher;
