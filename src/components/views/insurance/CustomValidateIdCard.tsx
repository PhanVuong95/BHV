import React from 'react';
import { Text } from 'zmp-ui';
import { composeValidator, isIdentityCardNumValid } from '../../../helpers/validator';
import { ICreateMotorInsuranceParams } from '../../../interfaces/insurance';
import CustomInput from '../../common/CustomInput';
import { ComponentRequire } from './MotorInsurance';

const CustomValidateIdCard = ({
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
            maxLength={12}
            type="text"
            label={(<Text className="text-sm"> Số CMND/CCCD {ComponentRequire()} </Text>) as any}
            placeholder="Số CMND/CCCD 9 hoặc 12 số"
            className="text-base  mt-2 block"
            required
            value={insuranceData.identityCardNum}
            onChange={(e) =>
                setInsuranceData((insurance) => ({
                    ...insurance,
                    identityCardNum: e.target.value.replace(/[^\d]/g, ""),
                }))
            }
            errorText={
                composeValidator(
                    [isIdentityCardNumValid],
                    activeValidate,
                    insuranceData.identityCardNum
                ).message
            }
            status={
                composeValidator(
                    [isIdentityCardNumValid],
                    activeValidate,
                    insuranceData.identityCardNum
                ).status
            }
        />
    </>

};

export default CustomValidateIdCard;