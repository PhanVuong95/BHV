import moment from "moment";
import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import { Text } from "zmp-ui";
import { EGender } from "../../../../enums";
import {
  ECategory,
  EPersonalAccidentPackageValue,
} from "../../../../enums/insurance";
import {
  ICategoryResponse,
  ICreatePersonalAccidentInsuranceParams,
} from "../../../../interfaces/insurance";
import { getInsuranceCategory } from "../../../../services/insurance";
import {
  IShowFieldsData,
  ShowFieldsData,
} from "../../../common/ShowFieldsData";

export const PersonalAccidentInsuranceFormConfirmData = ({
  insuranceData,
}: {
  insuranceData: ICreatePersonalAccidentInsuranceParams;
}) => {
  const [personalAccidentCategory, setPersonalAccidentCategory] = useState<
    ICategoryResponse[]
  >([]);

  useEffect(() => {
    getInsuranceCategory(ECategory.PERSONAL_ACCIDENT_PACKAGE).then((res) =>
      setPersonalAccidentCategory(res)
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
          value: `1 năm`,
        },

        {
          lable: "Số người",
          value: insuranceData.attachedList.length + 1,
        },

        {
          lable: "Sản phẩm chính",
          value: (
            <div>
              <Text>
                {
                  personalAccidentCategory.find(
                    (item) => item.Value === insuranceData.package
                  )?.Text
                }
              </Text>
              <Text className="text-gray-600 text-xs mt-1 italic">
                BH an tâm toàn diện
              </Text>
            </div>
          ),
        },

        {
          lable: "Sản phẩm bổ sung",
          value: insuranceData.hasComplementary ? (
            <Text>
              <Text>Trợ cấp y tế</Text>
              {![
                EPersonalAccidentPackageValue.BRONZE,
                EPersonalAccidentPackageValue.SILVER,
              ].includes(insuranceData.package) && <Text>Hỗ trợ giáo dục</Text>}
            </Text>
          ) : (
            "Không"
          ),
        },
      ],
    },

    {
      header: "Thông tin người mua bảo hiểm",
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
    ...insuranceData.attachedList.map((item, index) => ({
      header: `Thông tin người đính kèm ${index + 1}`,
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
      <div className="custom-show-feild-data"><ShowFieldsData datas={datas} half /></div>
    </>
  );
};
