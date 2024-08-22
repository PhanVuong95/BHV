import moment from "moment";
import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import { ECategory, EInsuranceSource } from "../../../../enums/insurance";
import {
  ICategoryResponse,
  IProvinceResponse,
  ICreateFireInsuranceParams,
} from "../../../../interfaces/insurance";
import { getInsuranceCategory } from "../../../../services/insurance";
import {
  IShowFieldsData,
  ShowFieldsData,
} from "../../../common/ShowFieldsData";

export const FireInsuranceFormConfirmData = ({
  insuranceData,
}: {
  insuranceData: ICreateFireInsuranceParams;
}) => {
  const [provinces, setProvinces] = useState<IProvinceResponse[]>([]);

  useEffect(() => {
    getInsuranceCategory<IProvinceResponse>(ECategory.PROVINCE).then((res) => {
      setProvinces(res);
    });
  }, []);

  const [pviFirePackageCategory, setPviFirePackageCategory] = useState<
    ICategoryResponse[]
  >([]);

  useEffect(() => {
    getInsuranceCategory(ECategory.FIRE_PACKAGES, {
      source: EInsuranceSource.PVI,
    }).then((res) => setPviFirePackageCategory(res));
  }, []);

  const address = useMemo(() => {
    const province = provinces.find(
      (province) => province.code == insuranceData.province
    );

    const district = (province?.districts || []).find(
      (district) => district.code == insuranceData.district
    );

    const ward = (district?.wards || []).find(
      (ward) => ward.code == insuranceData.ward
    );

    return `${insuranceData.address} ${ward?.name ? ", "+ ward?.name : ""} ${district?.name ? ", "+district?.name : ""} ${province?.name ? ", "+province?.name : ""}`;
  }, [
    insuranceData.province,
    insuranceData.district,
    insuranceData.ward,
    insuranceData.address,
    provinces,
  ]);
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
          value: `1 năm`,
        },
        {
          lable: "Gói bảo hiểm",
          value: pviFirePackageCategory.find(
            (i) => i.Value === insuranceData[insuranceData.source].package
          )?.Text,
        },
      ],
    },
    {
      header: "Thông tin chủ nhà",
      items: [
        { lable: "Tên", value: insuranceData.userName },
        { lable: "Địa chỉ", value: insuranceData.userAddress },
        { lable: "CCCD", value: insuranceData.identityCardNum },
        { lable: "Số điện thoại", value: insuranceData.phone },
        { lable: "Email", value: insuranceData.email },
      ],
    },
    {
      header: "Thông tin người thụ hưởng",
      items: [
        { lable: "Tên", value: insuranceData.beneficiaryName },
        {
          lable: "Địa chỉ",
          value: insuranceData.beneficiaryAddress,
        },
      ],
    },
    {
      header: "Thông tin căn nhà",
      items: [
        {
          lable: "Địa điểm",
          value: address,
        },
        {
          lable: "Năm xây dựng",
          value: insuranceData.yearBuilt,
        },
      ],
    },
  ];

  return (
    <>
      <div className="custom-show-feild-data"><ShowFieldsData datas={datas} half /></div>
    </>
  );
};
