import moment from "moment";
import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import { EGender } from "../../../../enums";
import { ECategory, EInsuranceSource } from "../../../../enums/insurance";
import {
  ICategoryResponse,
  ICreateCancerInsuranceParams,
} from "../../../../interfaces/insurance";
import { getInsuranceCategory } from "../../../../services/insurance";
import {
  IShowFieldsData,
  ShowFieldsData,
} from "../../../common/ShowFieldsData";

export const CancerInsuranceFormConfirmData = ({
  insuranceData,
}: {
  insuranceData: ICreateCancerInsuranceParams;
}) => {
  const [bicCancerCategory, setbicCancerCategory] = useState<
    ICategoryResponse[]
  >([]);

  useEffect(() => {
    getInsuranceCategory(ECategory.CANCER_PACKAGES, {
      source: EInsuranceSource.BIC,
    }).then((res) => setbicCancerCategory(res));
  }, []);

  const travelCategory = useMemo(
    () =>
      ({
        [EInsuranceSource.BIC]: bicCancerCategory,
      }[insuranceData.source]),
    [bicCancerCategory, insuranceData.source]
  );
  const datas: IShowFieldsData[] = [
    {
      header: "Thông tin chung",
      items: [
        {
          lable: "Gói bảo hiểm",
          value: travelCategory.find(
            (item) => item.Value === insuranceData[insuranceData.source].package
          )?.Text,
        },
        {
          lable: "Ngày bắt đầu",
          value: moment(insuranceData.startDate).format("DD/MM/YYYY"),
        },
        {
          lable: "Thời hạn",
          value: `1 năm`,
        },

        {
          lable: "Số người",
          value: insuranceData.personNum,
        },
      ],
    },

    {
      header: "Thông tin người mua",
      items: [
        { lable: "Tên", value: insuranceData.userName },
        {
          lable: "Ngày sinh",
          value: moment(insuranceData.birthday).format("DD/MM/YYYY"),
        },
        {
          lable: "Giới tính",
          value: insuranceData.gender === EGender.MALE ? "Nam" : "Nữ",
        },
        { lable: "CCCD", value: insuranceData.identityCardNum },
        {
          lable: "Địa chỉ",
          value: insuranceData.userAddress,
        },
        { lable: "Số điện thoại", value: insuranceData.phone },
        { lable: "Email", value: insuranceData.email },
      ],
    },
    ...insuranceData.attachedList.map((item, index) => ({
      header: `Thông tin người được bảo hiểm ${index + 1}`,
      items: [
        { lable: "Tên", value: item.fullName },
        {
          lable: "Ngày sinh",
          value: moment(item.birthday).format("DD/MM/YYYY"),
        },
        {
          lable: "Giới tính",
          value: item.gender === EGender.MALE ? "Nam" : "Nữ",
        },
        { lable: "CCCD", value: item.identityCardNum },
        {
          lable: "Địa chỉ",
          value: item.address,
        },
      ],
    })),
  ];

  return (
    <>
      <div className="custom-show-feild-data"><ShowFieldsData datas={datas} half /></div>
    </>
  );
};
