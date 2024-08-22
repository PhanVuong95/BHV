import React from 'react';
import { Text } from 'zmp-ui';

const CustomTitle = (props) => {
    const { className, title } = props
    return <Text.Title className={className} style={{ fontSize: '1rem', fontWeight: 600 }}>{title}</Text.Title>

};

export default CustomTitle;