import moment from "moment";
import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import { ECategory, EInsuranceSource } from "../../../../enums/insurance";
import {
  ICategoryResponse,
  ICreateHomeInsuranceParams,
  IProvinceResponse,
} from "../../../../interfaces/insurance";
import { getInsuranceCategory } from "../../../../services/insurance";
import {
  IShowFieldsData,
  ShowFieldsData,
} from "../../../common/ShowFieldsData";

export const HomeInsuranceFormConfirmData = ({
  insuranceData,
}: {
  insuranceData: ICreateHomeInsuranceParams;
}) => {
  const [usesCodes, setUsesCodes] = useState<ICategoryResponse[]>([]);
  const [riskCodes, setRiskCodes] = useState<ICategoryResponse[]>([]);
  const [provinces, setProvinces] = useState<IProvinceResponse[]>([]);
  const [homePackageCategory, setHomePackageCategory] = useState<
    ICategoryResponse[]
  >([]);

  useEffect(() => {
    getInsuranceCategory(ECategory.MUCDICH_SD).then((res) => setUsesCodes(res));
    getInsuranceCategory(ECategory.HOME_PACKAGES, {
      source: EInsuranceSource.PVI,
    }).then((res) => setHomePackageCategory(res));
    getInsuranceCategory(ECategory.MAHIEU_RUIRO).then((res) =>
      setRiskCodes(res)
    );
    getInsuranceCategory<IProvinceResponse>(ECategory.PROVINCE).then((res) => {
      setProvinces(res);
    });
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
    return `${insuranceData.address ? insuranceData.address : ""} ${ward?.name ? ", " + ward?.name : ""} ${district?.name ? ", " + district?.name : ""} ${province?.name ? ", " + province?.name : ""}`;
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
          value: `${insuranceData.expiry} tháng`,
        },
        {
          lable: "Gói bảo hiểm",
          value: homePackageCategory.find(
            (i) => i.Value === insuranceData.package
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
      header: "Thông tin căn nhà",
      items: [
        {
          lable: "Mục đích sử dụng",
          value: usesCodes.find((i) => i.Value === insuranceData.usesCode)
            ?.Text,
        },
        {
          lable: "Địa điểm",
          value: address,
        },
        {
          lable: "Bảo hiểm dưới dạng",
          value: riskCodes.find((i) => i.Value === insuranceData.riskCode)
            ?.Text,
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
