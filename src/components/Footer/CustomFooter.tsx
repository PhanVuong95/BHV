import React from 'react';
import FlexBox from '../common/FlexBox';
import { Button } from 'antd';

const CustomFooter = ({ cancelText = 'Quay lại', okText = 'Lưu thông tin',callBack=()=>{} }) => {
    const handleGoBack = () => {
        window.history.back();
    };

    return <FlexBox
        className="fixed bottom-0 justify-center left-0 p-4 "
        style={{
            width: "100%",
            background: "white",
            boxShadow: "-10px 0px 10px #E2E8F0",
            fontWeight: 600
        }}
    >
        <Button style={{ height: '48px',fontWeight:600,fontSize:'16px' }} className="mr-4 border-primary-color text-primary-color cback flex-1" onClick={handleGoBack}>
            {cancelText}
        </Button>
        <Button
        onClick={()=>{
            if(callBack){
                callBack()
            }
        }}
        style={{ height: '48px',fontWeight:600,fontSize:'16px' }} className="confirm flex-1" htmlType="submit">
            {okText}
        </Button>
    </FlexBox>
};

export default CustomFooter;