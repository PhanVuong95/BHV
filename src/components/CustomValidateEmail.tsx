import React from 'react';
import { ComponentRequire } from './views/insurance/MotorInsurance';
import CustomInput from './common/CustomInput';
import { Text } from 'zmp-ui';
import { ICreateAutoInsuranceParams, ICreateMotorInsuranceParams } from '../interfaces/insurance';
import { composeValidator, isEmailValid, isEmpty, isValidPhoneNumber } from '../helpers/validator';
import FlexBox from './common/FlexBox';

const CustomValidateEmail = ({
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
            maxLength={255}
            label='Email (*)'
            type="text"
            placeholder=""
            className="text-base bg-white"
            value={insuranceData.email}
            onChange={(e) =>
                setInsuranceData((insurance) => ({
                    ...insurance,
                    email: e.target.value?.replace(/ /g, ''),
                }))
            }
            errorText={
                composeValidator(
                    [isEmpty, isEmailValid],
                    activeValidate,
                    insuranceData.email
                ).message
            }
            status={
                composeValidator(
                    [isEmpty, isEmailValid],
                    activeValidate,
                    insuranceData.email
                ).status
            }
        />

    </>

};

export default CustomValidateEmail;