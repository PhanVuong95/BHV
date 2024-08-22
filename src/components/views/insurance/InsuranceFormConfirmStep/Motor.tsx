import moment from "moment";
import React from "react";
import { useEffect, useState } from "react";
import { Text } from "zmp-ui";
import { ECategory } from "../../../../enums/insurance";
import {
  ICategoryResponse,
  ICreateMotorInsuranceParams,
} from "../../../../interfaces/insurance";
import { getInsuranceCategory } from "../../../../services/insurance";

import {
  IShowFieldsData,
  ShowFieldsData,
} from "../../../common/ShowFieldsData";

export const MotorInsuranceFormConfirmData = ({
  insuranceData,
}: {
  insuranceData: ICreateMotorInsuranceParams;
}) => {
  const [motorCategory, setmotorCategory] = useState<ICategoryResponse[]>([]);
  useEffect(() => {
    getInsuranceCategory(ECategory.LOAIXEMOTOR).then((res) =>
      setmotorCategory(res)
    );
  }, []);
  const datas: IShowFieldsData[] = [
    {
      header: "Thông tin chung",
      items: [
        {
          lable: "Ngày bắt đầu",
          value: moment(insuranceData.startDate).format("DD/MM/YYYY"),
        },
        {
          lable: "Hiệu lực",
          value: `${insuranceData.expiry} năm`,
        },
        {
          lable: "Đăng ký bảo hiểm TNDSBB",
          value: "Có",
        },

        {
          lable: "Đăng ký bảo hiểm người ngồi trên xe",
          value:
            insuranceData.occupantInsurance > 0 ? (
              <Text>
                <Text>2 người</Text>
                <Text className="text-red-600 text-xs mt-1">
                  {`${new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(insuranceData.occupantInsurance)} /người/vụ`}
                </Text>
              </Text>
            ) : (
              "Không"
            ),
        },
      ],
    },
    {
      header: "Thông tin chủ xe",
      items: [
        { lable: "Tên", value: insuranceData.userName },
        { lable: "CCCD", value: insuranceData.identityCardNum },
        {
          lable: "Địa chỉ",
          value: insuranceData.userAddress,
        },
        { lable: "Số điện thoại", value: insuranceData.phone },
        { lable: "Email", value: insuranceData.email },
      ],
    },
    {
      header: "Thông tin xe",
      items: [
        { lable: "Biển số xe", value: insuranceData.licensePlates },
        { lable: "Số khung", value: insuranceData.chassisNumber },
        { lable: "Số máy", value: insuranceData.engineNumber },
        {
          lable: "Loại xe",
          value: motorCategory.find(
            (item) => item.Value === insuranceData.category
          )?.Text,
        },
        { lable: "Năm sản xuất", value: insuranceData.mfgDate },
      ],
    },
  ];

  return (
    <>
      <div className="custom-show-feild-data"><ShowFieldsData datas={datas} half /></div>
    </>
  );
};
