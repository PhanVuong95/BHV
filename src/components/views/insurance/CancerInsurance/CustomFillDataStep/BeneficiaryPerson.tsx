import React from "react";
import { ICreateCancerAttachedPerson } from "../../../../../interfaces/insurance";
import { Box, Input, Text } from "zmp-ui";
import CustomInput from "../../../../common/CustomInput";

type Props = {
  beneficiaryName: string;
  beneficiaryIdentityCardNum: string;
  beneficiaryRelationship: string;

  handleUpdateBeneficiaryPersonInfo: (
    key: keyof ICreateCancerAttachedPerson,
    value: string
  ) => void;
};

const BeneficiaryPerson = ({
  handleUpdateBeneficiaryPersonInfo,
  beneficiaryIdentityCardNum,
  beneficiaryName,
  beneficiaryRelationship,
}: Props) => {
  return (
    <Box className="bg-white p-4">
      <Text.Title className="font-semibold text-lg leading-6 pt-4 mb-4">
        Thông tin người thụ hưởng
        <Text className="font-light text-sm text-gray-600">
          (Không bắt buộc)
        </Text>
      </Text.Title>
      <CustomInput
        label={(<Text className="text-sm"> Họ tên</Text>) as any}
        type="text"
        placeholder="Nguyễn Văn A"
        className="text-base mt-2 block"
        required
        value={beneficiaryName}
        onChange={(e) =>
          handleUpdateBeneficiaryPersonInfo("beneficiaryName", e.target.value)
        }
      />
      <CustomInput
        type="text"
        label={(<Text className="text-sm"> Số CMND/CCCD </Text>) as any}
        placeholder="Số CMND/CCCD 9 hoặc 12 số"
        className="text-base mt-2 block"
        required
        value={beneficiaryIdentityCardNum}
        onChange={(e) =>
          handleUpdateBeneficiaryPersonInfo(
            "beneficiaryIdentityCardNum",
            e.target.value.replace(/[^\d]/g, "")
          )
        }
      />
      <CustomInput
        label={
          (
            <Text className="text-sm">
              {" "}
              Mối quan hệ với người được bảo hiểm?{" "}
            </Text>
          ) as any
        }
        type="text"
        placeholder="Cha/Mẹ/Con/Anh/Em"
        className="text-base mt-2 block"
        required
        value={beneficiaryRelationship}
        onChange={(e) =>
          handleUpdateBeneficiaryPersonInfo(
            "beneficiaryRelationship",
            e.target.value
          )
        }
      />
    </Box>
  );
};

export default BeneficiaryPerson;
