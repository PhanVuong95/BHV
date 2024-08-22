import React from 'react';
import { Text } from 'zmp-ui';

const CSubTitlte = ({title=''}) => {
    return <Text className="fs-10" style={{position:'relative',top:'-10px',color:'#808080'}}>{title}</Text>

};

export default CSubTitlte;