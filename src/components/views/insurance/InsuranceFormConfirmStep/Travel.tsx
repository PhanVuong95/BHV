import moment from "moment";
import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import { EGender } from "../../../../enums";
import { ECategory, EInsuranceSource } from "../../../../enums/insurance";
import {
  ICategoryResponse,
  ICreateDomesticTravelInsuranceParams,
  ICreateOverseaTravelInsuranceParams,
} from "../../../../interfaces/insurance";
import { getInsuranceCategory } from "../../../../services/insurance";
import {
  IShowFieldsData,
  ShowFieldsData,
} from "../../../common/ShowFieldsData";

export const DomesticTravelInsuranceFormConfirmData = ({
  insuranceData,
}: {
  insuranceData: ICreateDomesticTravelInsuranceParams;
}) => {
  const [pviTravelCategory, setpviTravelCategory] = useState<
    ICategoryResponse[]
  >([]);
  const [bicTravelCategory, setbicTravelCategory] = useState<
    ICategoryResponse[]
  >([]);
  const [bshTravelCategory, setbshTravelCategory] = useState<
    ICategoryResponse[]
  >([]);

  useEffect(() => {
    getInsuranceCategory(ECategory.DOMESTIC_TRAVEL_PACKAGE, {
      source: EInsuranceSource.PVI,
    }).then((res) => setpviTravelCategory(res));
    getInsuranceCategory(ECategory.DOMESTIC_TRAVEL_PACKAGE, {
      source: EInsuranceSource.BIC,
    }).then((res) => setbicTravelCategory(res));
    getInsuranceCategory(ECategory.DOMESTIC_TRAVEL_PACKAGE, {
      source: EInsuranceSource.BSH,
    }).then((res) => setbshTravelCategory(res));
  }, []);

  const travelCategory = useMemo(
    () =>
      ({
        [EInsuranceSource.BIC]: bicTravelCategory,
        [EInsuranceSource.PVI]: pviTravelCategory,
        [EInsuranceSource.BSH]: bshTravelCategory,
      }[insuranceData.source]),
    [
      pviTravelCategory,
      bicTravelCategory,
      bshTravelCategory,
      insuranceData.source,
    ]
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
          lable: "Thời gian du lịch",
          value: `${insuranceData.duration} ngày`,
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
        // { lable: "Số điện thoại", value: item.phone },
        // { lable: "Email", value: item.email },
      ],
    })),
  ];

  return (
    <>
      <div className="custom-show-feild-data">
        <ShowFieldsData datas={datas} half />
      </div>
    </>
  );
};

export const OverseaTravelInsuranceFormConfirmData = ({
  insuranceData,
}: {
  insuranceData: ICreateOverseaTravelInsuranceParams;
}) => {
  const [pviTravelCategory, setpviTravelCategory] = useState<
    ICategoryResponse[]
  >([]);
  const [bicTravelCategory, setbicTravelCategory] = useState<
    ICategoryResponse[]
  >([]);
  const [bshTravelCategory, setbshTravelCategory] = useState<
    ICategoryResponse[]
  >([]);

  useEffect(() => {
    getInsuranceCategory(ECategory.OVERSEA_TRAVEL_PACKAGE, {
      source: EInsuranceSource.PVI,
    }).then((res) => setpviTravelCategory(res));
    getInsuranceCategory(ECategory.OVERSEA_TRAVEL_PACKAGE, {
      source: EInsuranceSource.BIC,
    }).then((res) => setbicTravelCategory(res));
    getInsuranceCategory(ECategory.OVERSEA_TRAVEL_PACKAGE, {
      source: EInsuranceSource.BSH,
    }).then((res) => setbshTravelCategory(res));
  }, []);

  const travelCategory = useMemo(
    () =>
      ({
        [EInsuranceSource.BIC]: bicTravelCategory,
        [EInsuranceSource.PVI]: pviTravelCategory,
        [EInsuranceSource.BSH]: bshTravelCategory,
      }[insuranceData.source]),
    [
      pviTravelCategory,
      bicTravelCategory,
      bshTravelCategory,
      insuranceData.source,
    ]
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
          lable: "Thời gian du lịch",
          value: `${insuranceData.duration} ngày`,
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
        { lable: "Số điện thoại", value: item.phone },
        { lable: "Email", value: item.email },
      ],
    })),
  ];

  return (
    <>
      <div className="custom-show-feild-data">
        <ShowFieldsData datas={datas} half />
      </div>
    </>
  );
};
