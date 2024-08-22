// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Icon, Text, DatePicker, Box, Select } from "zmp-ui";
// import LayoutHeader from "../../layouts/LayoutHeader";
// import CollapseWrap from "../../common/Collapse";
// import FlexBox from "../../common/FlexBox";
// import VoluntaryFooter from "./VoluntaryFooter";
// import CustomButton from "../../common/CustomButton";
// import CustomInput from "../../common/CustomInput";
// import {
//   composeValidator,
//   isEmpty,
//   isGTE,
//   isLTE,
//   isStartDateValid,
// } from "../../../helpers/validator";
// import moment from "moment";


// type Props = {
//   setStep?: React.Dispatch<React.SetStateAction<number>>;
//   insuranceData: any;
//   setInsuranceData?: React.Dispatch<
//     React.SetStateAction<any>
//   >;
// };
// const FirstStepFillData = (props: Props) => {
//   const {
//     setStep = () => { },
//     insuranceData,
//     setInsuranceData = () => {},
//   } = props;
//   const navigate = useNavigate();
//   const [activeValidate, setActiveValidate] = useState<boolean>(false);

//   return (
//     <>
//       <LayoutHeader
//         showBackIcon={true}
//         title={<Text className="text-white">BHXH Tự nguyện</Text>}
//         onBackClick={() => {
//           navigate("/social-insurance");
//         }}
//       />
// <h3>Thông tin người mua bảo hiểm</h3>
//       <div className="rounded-lg  shadow-lg p-2 pt-4">
//         <CustomInput
//           label={
//             (<Text className="zaui-text-title">Tên</Text>) as any
//           }
//           type="text"
//           placeholder="Lê Đức Toàn"
//           className="text-base mt-2 block"
//           required
//           value={insuranceData.userName || 0}
//           onChange={(e) => setInsuranceData((insurance) => ({
//             ...insurance,
//             userName: Number(e.target.value.replace(/[^\d]/g, "")),
//           }))
//           }
//           errorText={
//             composeValidator(
//               [isEmpty, isLTE, isGTE],
//               activeValidate,
//               insuranceData.userName,
//               { min: 100 }
//             ).message
//           }
//           status={
//             insuranceData.userName
//               ? composeValidator(
//                 [isEmpty, isLTE, isGTE],
//                 activeValidate,
//                 insuranceData.userName,
//                 { min: 100 }
//               ).status
//               : "error"
//           }
//           suffix={(<Text className="pr-2">Người</Text>) as any}
//         />
//         <FlexBox className="text-gray-500 items-center pt-2">
//             <Icon icon="zi-info-circle-solid" size={16} />
//             <Text className="pl-2 text-xs">Tối đa 100 người</Text>
//           </FlexBox>
//       </div>


      
//       <Box className="shadow rounded-xl p-4">
//           <Text.Title className="font-medium text-lg leading-6">
//           Số tháng đóng
//           </Text.Title>
//           <Select
//             closeOnSelect
//             placeholder="Số tháng đóng"
//             value=""
            
//           >
//             {(
//               <option value="6">6</option>
//             )}
//           </Select>
//           <div
            
//           >
            
//           </div>
//         </Box>


//       <div className="rounded-lg  shadow-lg p-2 pt-4">
//         <CustomInput
//           label={
//             (<Text className="zaui-text-title">Mức lương làm căn cứ đóng</Text>) as any
//           }
//           type="text"
//           placeholder="Mức lương làm căn cứ đóng"
//           className="text-base mt-2 block"
//           required
//           value={insuranceData.customerPrice || ""}
//           onChange={(e) => setInsuranceData((insurance) => ({
//             ...insurance,
//             customerPrice: String(e.target.value),
//           }))
//           }
//           errorText={
//             composeValidator(
//               [isEmpty, isLTE, isGTE],
//               activeValidate,
//               insuranceData.customerPrice,
//             ).message
//           }
//           status={
//             insuranceData.vehicleLoad
//               ? composeValidator(
//                 [isEmpty, isLTE, isGTE],
//                 activeValidate,
//                 insuranceData.customerPrice,
//               ).status
//               : "error"
//           }
//           suffix={(<Text className="pr-2">đ</Text>) as any}
//         />
//         <FlexBox className="text-gray-500 items-center pt-2">
//             <Icon icon="zi-info-circle-solid" size={16} />
//             <Text className="pl-2 text-xs">Nhập mức lương trung bình để tạm tính số tiền BH</Text>
//           </FlexBox>
//       </div>
//       <FlexBox className="justify-between mb-2 p-2 pt-4">
//                     <Text.Title className="text-[#565758] text-lg">
//                     Mức giảm trừ
//                     </Text.Title>
//                     <Text.Title className="text-lg text-[#1E3880]">
//                         -236.000 ₫
//                     </Text.Title>
//                 </FlexBox>
//       <Box className="shadow rounded-xl p-4">
//           <Text.Title className="zaui-text-title text-lg leading-6">
//           Chọn mã giảm giá
//           </Text.Title>
//           <Select
//             closeOnSelect
//             placeholder="X mã giảm giá khả dụng"
//             value=""
            
//           >
//             {(
//               <option value="10">10</option>
//             )}
//           </Select>
//           <div
            
//           >
//             <Text className="text-blue-500 pt-2 italic text-sm">{`Xem quyền lợi bảo hiểm`}</Text>
//           </div>
//         </Box>


//       {/* <FlexBox className="border-b pb-4">
//           <div className="pr-1">
//             <DatePicker
//               placeholder="Ngày bắt đầu"
//               mask
//               maskClosable
//               dateFormat="dd/mm/yyyy"
//               title="Ngày bắt đầu"
//               defaultValue={new Date(insuranceData.startDate)}
//               onChange={(value) => {
//                 setInsuranceData((insurance) => ({
//                   ...insurance,
//                   startDate: new Date(value).getTime(),
//                 }));
//               }}
//               errorText={
//                 composeValidator(
//                   [isStartDateValid],
//                   activeValidate,
//                   insuranceData.startDate
//                 ).message
//               }
//               status={
//                 composeValidator(
//                   [isStartDateValid],
//                   activeValidate,
//                   insuranceData.startDate
//                 ).status
//               }
//             />
//           </div>
//           <FlexBox className="h-[50px] items-center p-2">
//             <div
//               className="border-b w-3"
//               style={{ borderColor: "lightgray" }}
//             />
//           </FlexBox>
//           <div className="pl-1" style={{ pointerEvents: "none" }}>
//             <DatePicker
//               placeholder="Placeholder"
//               mask
//               maskClosable
//               disabled
//               dateFormat="dd/mm/yyyy"
//               value={
//                 new Date(
//                   moment(insuranceData.startDate)
//                     .add(insuranceData.expiry, "years")
//                     .toISOString()
//                 )
//               }
//             />
//             <Text className="text-sm pt-1  text-gray-500">
//               Tự động chọn ngày
//             </Text>
//           </div>
//         </FlexBox> */}
//       {/* <div className="bg-white mt-2 p-4">
//         <CollapseWrap
//           title="Giai đoạn đóng bảo hiểm #1"
//           height={0}
//           defaultOpen={true}
//           content={[
//             {
//               type: "text",
//               content: "Thời gian đóng ",
//             },
//             {
//               type: "text",
//               content:
//                 "Mức lương đóng BHXH giai đoạn này",
//             }
//             ,
//           ]}
//         />
//       </div> */}




//       <VoluntaryFooter
//         nextContent="Tiếp tục"
//         handlePrev={() => {
//           setStep((step) => step - 1);
//         }}
//         handleNext={() => {
//           if (
//             composeValidator(
//               [isEmpty, isLTE, isGTE],
//               true,
//               { min: 1, max: 100 }
//             ).status === "error"
//           )
//             return;
//         }}
        
//       />
       
//     </>
//   );
// };

// export default FirstStepFillData;
