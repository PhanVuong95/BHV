import React from 'react';
import CustomSelectV3 from './CustomSelectV3';
import { EGender } from '../../enums';
import { ICSuplier } from './CSuplier';
import { ICreateExtendedAccidentInsuranceParams } from '../../interfaces/insurance';
interface ICustomSelectGender {
    insuranceData: any;
    setInsuranceData: any
}

const CustomSelectGender = ({ insuranceData, setInsuranceData }: ICustomSelectGender) => {
    return <CustomSelectV3
        onChange={(value) =>
            setInsuranceData((insurance) => ({
                ...insurance,
                gender: value?.Value as EGender,
            }))
        }
        label='Giới tính'
        options={Object.values(EGender).map((itemMap) => {
            return {
                Value: itemMap,
                Text: itemMap === EGender.MALE ? 'Nam' : 'Nữ'
            }
        })}
        value={(insuranceData.gender) as any}
    />
};

export default CustomSelectGender;