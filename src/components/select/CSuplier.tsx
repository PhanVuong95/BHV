import React from 'react';
import CustomSelectV3 from './CustomSelectV3';
import { EInsuranceFeature, EInsuranceSource } from '../../enums/insurance';
import { useRecoilValue } from 'recoil';
import { insuranceServicesState } from '../../state';
import { ICreateAutoInsuranceParams, ICreateDomesticTravelInsuranceParams, ICreateExtendedAccidentInsuranceParams, ICreateHealthInsuranceParams, ICreateHomeInsuranceParams, ICreateMotorInsuranceParams, ICreatePersonalAccidentAttachedPerson, ICreatePersonalAccidentInsuranceParams } from '../../interfaces/insurance';
export interface ICSuplier {
    setInsuranceData: React.Dispatch<React.SetStateAction<ICreateMotorInsuranceParams | ICreateAutoInsuranceParams | ICreateHealthInsuranceParams | ICreateDomesticTravelInsuranceParams | ICreateExtendedAccidentInsuranceParams| ICreateHomeInsuranceParams|ICreatePersonalAccidentInsuranceParams>>
    insuranceData: ICreateMotorInsuranceParams | ICreateAutoInsuranceParams | ICreateDomesticTravelInsuranceParams | ICreateHealthInsuranceParams | ICreateExtendedAccidentInsuranceParams| ICreateHomeInsuranceParams|ICreatePersonalAccidentInsuranceParams
    type?: EInsuranceFeature
}
const CSuplier = ({ setInsuranceData, insuranceData, type }: ICSuplier) => {
    const insuranceServicesValue = useRecoilValue(insuranceServicesState);

    return <CustomSelectV3
        onChange={(e) => {
            setInsuranceData((data) => ({
                ...data,
                source: e?.Value as EInsuranceSource,
            }))
        }}
        label='Nhà cung cấp (*)'
        options={[
            ...(insuranceServicesValue.features.find(
                (item) => item.feature === type
            )?.sources || []),
        ].map((itemMap) => {
            return {
                Value: itemMap,
                Text: itemMap
            }
        })}
        value={insuranceData.source}
    />
};

export default CSuplier;