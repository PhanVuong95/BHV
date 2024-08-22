import React from 'react';
import { ComponentRequire } from './views/insurance/MotorInsurance';
import CustomInput from './common/CustomInput';
import { Text } from 'zmp-ui';
import { ICreateMotorInsuranceParams } from '../interfaces/insurance';
import { composeValidator, isEmpty, isValidPhoneNumber } from '../helpers/validator';

const CustomValidatePhone = ({
    insuranceData,
    setInsuranceData = () => { },
    activeValidate
}: {
    insuranceData: ICreateMotorInsuranceParams | any;
    setInsuranceData?: React.Dispatch<
        React.SetStateAction<ICreateMotorInsuranceParams | any>
    >;
    activeValidate: boolean
}) => {
    return <>
        <CustomInput
            inputMode='numeric'
            maxLength={10}
            label='Số điện thoại (*)'
            placeholder=""
            className="text-base mt-2 block"
            required
            value={insuranceData?.phone}
            onChange={(e) =>
                setInsuranceData((insurance) => ({
                    ...insurance,
                    phone: e.target.value.replace(/[^\d]/g, ""),
                }))
            }
            errorText={
                composeValidator(
                    [isEmpty, isValidPhoneNumber],
                    activeValidate,
                    insuranceData.phone
                ).message
            }
            status={
                composeValidator(
                    [isEmpty, isValidPhoneNumber],
                    activeValidate,
                    insuranceData.phone
                ).status
            }

        /></>

};

export default CustomValidatePhone;