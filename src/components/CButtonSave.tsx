import React from 'react';
interface ICButtonSave {
    onCallback:()=>void
}
const CButtonSave = ({onCallback}:ICButtonSave) => {
    return  <div
    onClick={()=>{
      onCallback()
    }}
      style={{
        borderRadius: '12px',
        fontSize: '16px',
        fontWeight: 600,
        background: `var(--primary-color)`,
        color: 'white',
        height: '48px',
        lineHeight: '48px',
        textAlign: 'center',
        marginTop:24
      }} >Lưu thông tin</div>
};

export default CButtonSave;