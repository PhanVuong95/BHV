// import React from "react";
// import { ICreateHealthAttachedPerson } from "../../../../../interfaces/insurance";
// import { Box, Input, Text } from "zmp-ui";

// type Props = {
//   beneficiaryName: string;
//   beneficiaryIdentityCardNum: string;
//   beneficiaryRelationship: string;

//   handleUpdateBeneficiaryPersonInfo: (
//     key: keyof ICreateHealthAttachedPerson,
//     value: string
//   ) => void;
// };

// const BeneficiaryPerson = ({
//   handleUpdateBeneficiaryPersonInfo,
//   beneficiaryIdentityCardNum,
//   beneficiaryName,
//   beneficiaryRelationship,
// }: Props) => {
//   return (
//     <Box className="bg-white p-4 pb-44">
//       <Text.Title className="font-semibold text-lg leading-6 pt-4 pb-4 mb-4 border-b">
//         Thông tin người thụ hưởng
//       </Text.Title>

//       <Input
//         label={(<Text className="text-sm"> Họ tên</Text>) as any}
//         type="text"
//         placeholder="Nguyễn Văn A"
//         className="text-base mt-2 block"
//         required
//         defaultValue={beneficiaryName}
//         onChange={(e) =>
//           handleUpdateBeneficiaryPersonInfo("beneficiaryName", e.target.value)
//         }
//       />

//       <Input
//         type="text"
//         label={(<Text className="text-sm"> Số CMND/CCCD </Text>) as any}
//         placeholder="Số CMND/CCCD 9 hoặc 12 số"
//         className="text-base mt-2 block"
//         required
//         value={beneficiaryIdentityCardNum}
//         onChange={(e) =>
//           handleUpdateBeneficiaryPersonInfo(
//             "beneficiaryIdentityCardNum",
//             e.target.value.replace(/[^\d]/g, "")
//           )
//         }
//       />
//       <Input
//         label={
//           (
//             <Text className="text-sm">
//               {" "}
//               Mối quan hệ với người được bảo hiểm?{" "}
//             </Text>
//           ) as any
//         }
//         type="text"
//         placeholder="Cha/Mẹ/Con/Anh/Em"
//         className="text-base mt-2 block"
//         required
//         defaultValue={beneficiaryRelationship}
//         onChange={(e) =>
//           handleUpdateBeneficiaryPersonInfo(
//             "beneficiaryRelationship",
//             e.target.value
//           )
//         }
//       />
//     </Box>
//   );
// };

// export default BeneficiaryPerson;

import React from "react";

const BeneficiaryPerson = () => {
  return <div>BeneficiaryPerson</div>;
};

export default BeneficiaryPerson;
