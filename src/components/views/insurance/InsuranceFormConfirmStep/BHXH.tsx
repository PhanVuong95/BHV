import moment from "moment";
import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import { EGender } from "../../../../enums";
import { ECategory, EInsuranceSource } from "../../../../enums/insurance";
import {
  ICategoryResponse,
  ICreateBHXHInsuranceParams,
} from "../../../../interfaces/insurance";
import { getInsuranceCategory } from "../../../../services/insurance";
import {
  IShowFieldsData,
  ShowFieldsData,
} from "../../../common/ShowFieldsData";

export const BHXHInsuranceFormConfirmData = ({
  insuranceData,
}: {
  insuranceData: ICreateBHXHInsuranceParams;
}) => {
  const [bhxhCategory, setbhxhCategory] = useState<
    ICategoryResponse[]
  >([]);

  useEffect(() => {
    getInsuranceCategory(ECategory.BHXH_PACKAGES, {
      source: EInsuranceSource.DNP,
    }).then((res) => setbhxhCategory(res));
  }, []);

  const travelCategory = useMemo(
    () =>
      ({
        [EInsuranceSource.BIC]: bhxhCategory,
      }[insuranceData.source]),
    [bhxhCategory, insuranceData.source]
  );
  const datas: IShowFieldsData[] = [
    {
      header: "Thông tin chung",
      items: [
        // {
        //   lable: "Gói bảo hiểm",
        //   value: travelCategory.find(
        //     (item) => item.Value === insuranceData[insuranceData.source].package
        //   )?.Text,
        // },
        // {
        //   lable: "Ngày bắt đầu",
        //   value: moment(insuranceData.startDate).format("DD/MM/YYYY"),
        // },
        {
          lable: "Loại bảo hiểm",
          value: 'BHXH tự nguyện',
        },
        {
          lable: "Thời hạn",
          value: `1 năm`,
        },

        {
          lable: "Số người tham gia mua",
          value: 3,
        },
      ],
    },

    {
      header: "Thông tin người mua",
      items: [
        { lable: "Tên", value : "Nguyễn Văn B" },
        { lable: "CCCD", value: "258553555 " },
        {
          lable: "Địa chỉ",
          value: "123 Xuân La",
        }, 
        {
          lable: "Ngày sinh",
          value: "21/04/2004",
        },
      ],
    },
    ...insuranceData.attachedList.map((item, index) => ({
      header: `Thông tin người được bảo hiểm ${index + 1}`,
      items: [
        { lable: "Tên", value: item.fullName },
        { lable: "CCCD", value: item.identityCardNum },
        {
          lable: "Ngày sinh",
          value: moment(item.birthday).format("DD/MM/YYYY"),
        },
        {
          lable: "Địa chỉ",
          value: item.address,
        },
        { lable: "Số BHXH", value: "65367387" },
        {
          lable: "Mức lương đóng",
          value: "10.000.000đ",
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