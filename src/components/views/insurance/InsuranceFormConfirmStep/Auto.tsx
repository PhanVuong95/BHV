import { pick } from "lodash";
import moment from "moment";
import React from "react";
import { useEffect, useState } from "react";
import { Text } from "zmp-ui";
import { ECategory, EInsuranceSource } from "../../../../enums/insurance";
import {
  IAutoTypeResponse,
  ICategoryResponse,
  ICreateAutoInsuranceParams,
} from "../../../../interfaces/insurance";
import {
  getAutoInsuranceCategoryCode,
  getInsuranceCategory,
} from "../../../../services/insurance";
import {
  IShowFieldsData,
  ShowFieldsData,
} from "../../../common/ShowFieldsData";

export const AutoInsuranceFormConfirmData = ({
  insuranceData,
}: {
  insuranceData: ICreateAutoInsuranceParams;
}) => {
  const [userIntent, setuserIntent] = useState<ICategoryResponse[]>([]);
  const [micAutoTypes, setmicAutoTypes] = useState<IAutoTypeResponse[]>([]);
  const [pviAutoTypes, setpviAutoTypes] = useState<ICategoryResponse[]>([]);
  const [vbiAutoTypes, setvbiAutoTypes] = useState<ICategoryResponse[]>([]);
  const [vbiUserItent, setvbiUserIntent] = useState<ICategoryResponse[]>([]);
  const [bshAutoTypes, setbshAutoTypes] = useState<ICategoryResponse[]>([]);
  const [bshUserItent, setbshUserIntent] = useState<ICategoryResponse[]>([]);
  useEffect(() => {
    setmicAutoTypes([]);
    getInsuranceCategory(ECategory.MDSD_AUTO, {
      source: insuranceData.source,
    }).then((res) => setuserIntent(res));
    getInsuranceCategory<IAutoTypeResponse>(ECategory.AUTO_TYPE).then((res) =>
      setmicAutoTypes(res)
    );
    setvbiAutoTypes([]);
    setvbiUserIntent([]);
    getInsuranceCategory(ECategory.AUTO_TYPE, {
      source: EInsuranceSource.VBI,
    }).then((res) => setvbiAutoTypes(res));
    getInsuranceCategory(ECategory.MDSD_VBI_AUTO, {
      source: EInsuranceSource.VBI,
    }).then((res) => setvbiUserIntent(res));
    setbshAutoTypes([]);    
    getInsuranceCategory(ECategory.AUTO_TYPE, {
      source: EInsuranceSource.BSH, userIntent: insuranceData.userIntent, selectedValue: insuranceData.BSH.group
    }).then((res) => setbshAutoTypes(res));
    getInsuranceCategory(ECategory.MDSD_BSH_AUTO, {
      source: EInsuranceSource.BSH,
    }).then((res) => setbshUserIntent(res));
  }, [insuranceData.source]);

  useEffect(() => {
    getAutoInsuranceCategoryCode(insuranceData.userIntent).then((res) => {
      setpviAutoTypes(res);
    });
  }, [JSON.stringify(pick(insuranceData, ["userIntent"]))]);

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
                <Text>{`${insuranceData.seats} người`}</Text>
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
        {
          lable: "Mục đích sử dụng",
          value:
            userIntent.find((item) => item.Value === insuranceData.userIntent)
              ?.Text ||
            vbiUserItent.find((item) => item.Value === insuranceData.userIntent)
              ?.Text || 
            bshUserItent.find((item) => item.Value === insuranceData.userIntent)
              ?.Text,
        },
        {
          lable: "Loại xe",
          value:
            micAutoTypes.find(
              (type) => insuranceData[insuranceData.source].type == type.Value
            )?.Text ||
            pviAutoTypes.find(
              (item) => item.Value === insuranceData[insuranceData.source].type
            )?.Text ||
            vbiAutoTypes.find(
              (item) => item.Value === insuranceData[insuranceData.source].type
            )?.Text ||
            bshAutoTypes.find(
              (item) => item.Value === insuranceData[insuranceData.source].type
            )?.Text,
        },
        { lable: "Số chỗ ngồi", value: String(insuranceData.seats) },
        { lable: "Biển số xe", value: insuranceData.licensePlates },
        { lable: "Số khung", value: insuranceData.chassisNumber },
        { lable: "Số máy", value: insuranceData.engineNumber },
        { lable: "Năm sản xuất", value: insuranceData.mfgDate },
      ],
    },
  ];

  return (
    <div className="custom-show-feild-data">
      <ShowFieldsData datas={datas} half />
    </div>
  );
};
