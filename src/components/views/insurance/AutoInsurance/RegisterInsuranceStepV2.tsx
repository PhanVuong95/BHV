import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { InfoSvg } from "../../svgs/InfoSvg";
import { InfoFilledSvg } from "../../svgs/InfoFilledSvg";
import { ConfirmSvg } from "../../svgs/ConfirmSvg";
import { ConfirmFilledSvg } from "../../svgs/ConfirmFilledSvg";
import { PaymentFilledSvg } from "../../svgs/PaymentFilledSvg";
import { PaymentSvg } from "../../svgs/PaymentSvg";
import { Text } from "zmp-ui";
import FlexBox from "../../common/FlexBox";
type Props = { step?: 0 | 1 | 2 | 3 | 4, isCancer?: boolean };
const RegisterInsuranceStepV2 = ({ step = 1, isCancer = false }: Props) => {
  const checkIsCancer = isCancer ? [1, 2, 3, 4] : [1, 2, 3]
  return <>
    {
      step >= 1 && <div style={{ background: '#DEE7FE', padding: '24px 18px' }}>
        <div className="custom-header-inprogress">
          {
            checkIsCancer.map((itemMap) => <div
              style={{ width: (itemMap === step) ? '80%' : '10%' }}
              className={`${(itemMap === step || step >= itemMap) ? 'custom-header-inprogress-item active' : 'custom-header-inprogress-item'} `}>
            </div>
            )
          }
        </div>
        <div className="d-flex text-primary-color fs-14 fw-600" style={{ marginTop: 6 }}>
          <div className="flex-1 ">
            {
              !isCancer ? <>
                {step === 1 ? 'Nội dung bảo hiểm' : ''}
                {step === 2 ? 'Thông tin hợp đồng' : ''}
                {step === 3 ? 'Xác nhận thông tin' : ''}</> :
                <>
                  {step === 1 ? 'Nội dung bảo hiểm' : ''}
                  {step === 2 ? 'Tình trạng sức khỏe' : ''}
                  {step === 3 ? 'Thông tin hợp đồng' : ''}
                  {step === 4 ? 'Xác nhận thông tin' : ''}
                </>
            }
          </div>
          <div>{Math.round(step)}/{checkIsCancer.length}</div>
        </div>
      </div>
    }</>

};

export default RegisterInsuranceStepV2;
