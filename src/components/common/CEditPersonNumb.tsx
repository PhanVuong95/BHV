import React from 'react';
import { Box, DatePicker, Text } from 'zmp-ui';
import LayoutHeaderV2 from '../layouts/LayoutHeaderV2';
import CustomInput from './CustomInput';
import { composeValidator, isEmpty } from '../../helpers/validator';
import CustomSelectV3 from '../select/CustomSelectV3';
import { EGender } from '../../enums';
import CustomDatePickerV2 from './DatePicker/CustomDatePickerV2';
import moment from 'moment';
import { DEFAULT_FORMAT_DATE } from '../views/insurance/AutoInsurance/AutoInsuranceFormFillDataStep';
interface ICEditPersonNumb {
    insuranceData: any
    activeValidate: boolean
    seteditPersonNum: any
    editPersonNum: number
    handleSetAttachedPersonInfo: any
}
const CEditPersonNumb = ({ insuranceData, activeValidate, seteditPersonNum, editPersonNum, handleSetAttachedPersonInfo }: ICEditPersonNumb) => {
    return <Box className="bg-white">
        <LayoutHeaderV2
            showBackIcon={true}
            title={'Thông tin người nhận bảo hiểm'}
            onBackClick={() => {
                seteditPersonNum(0)
            }}
        />
        <div className="mt-4"></div>
        <CustomInput
            label={(<Text className="text-sm"> Họ tên (*)</Text>) as any}
            type="text"
            placeholder="Nguyễn Văn A"
            className="text-base mt-2 block"
            required
            value={
                insuranceData.attachedList[editPersonNum - 1].fullName
            }
            onChange={(e) =>
                handleSetAttachedPersonInfo("fullName", e.target.value)
            }
        />

        <CustomInput
            label={
                (
                    <Text className="text-sm"> Địa chỉ thường trú (*)</Text>
                ) as any
            }
            type="text"
            placeholder="Mễ Trì Hạ, Nam Từ Liêm, Hà Nội"
            className="text-base mt-2 block"
            required
            value={
                insuranceData.attachedList[editPersonNum - 1].address
            }
            onChange={(e) =>
                handleSetAttachedPersonInfo("address", e.target.value)
            }
            errorText={
                composeValidator(
                    [isEmpty],
                    activeValidate,
                    insuranceData.userAddress
                ).message
            }
            status={
                composeValidator(
                    [isEmpty],
                    activeValidate,
                    insuranceData.userAddress
                ).status
            }
        />

        <CustomInput
            type="text"
            label={
                (
                    <Text className="text-sm"> Số CMND/CCCD/Hộ chiếu (*)</Text>
                ) as any
            }
            placeholder="Số CMND/CCCD/Hộ chiếu"
            className="text-base  mt-2 block"
            required
            value={
                insuranceData.attachedList[editPersonNum - 1].identityCardNum
            }
            onChange={(e) =>
                handleSetAttachedPersonInfo("identityCardNum", e.target.value)
            }
        />

        <CustomInput
            label={
                (<Text className="text-sm"> Số điện thoại </Text>) as any
            }
            type="text"
            placeholder="098xxxxxxxx"
            required
            value={insuranceData.attachedList[editPersonNum - 1].phone}
            onChange={(e) =>
                handleSetAttachedPersonInfo(
                    "phone",
                    e.target.value.replace(/[^\d]/g, "")
                )
            }
        />
        <Box className="mt-2">

            <CustomSelectV3
                onChange={(value) =>
                    handleSetAttachedPersonInfo("gender", value?.Value)
                }
                label='Giới tính'
                options={Object.values(EGender).map((itemMap) => {
                    return {
                        Value: itemMap,
                        Text: itemMap === EGender.MALE ? 'Nam' : 'Nữ'
                    }
                })}
                value={insuranceData.attachedList[editPersonNum - 1].gender}
            />

        </Box>
        <Box className="mt-2">

            <CustomDatePickerV2
                onChange={(e, e1) => {
                    handleSetAttachedPersonInfo("birthday", new Date(e))
                }}
                label="Ngày sinh (*)"
                value={new Date(
                    insuranceData.attachedList[editPersonNum - 1].birthday
                )}
            />

            {/* <DatePicker
                placeholder="Placeholder"
                mask
                maskClosable
                dateFormat="dd/mm/yyyy"
                title="Ngày sinh"
                defaultValue={
                    new Date(
                        insuranceData.attachedList[editPersonNum - 1].birthday
                    )
                }
                onChange={(value) => {
                    handleSetAttachedPersonInfo("birthday", new Date(value));
                }}
            /> */}
        </Box>
    </Box>
};

export default CEditPersonNumb;