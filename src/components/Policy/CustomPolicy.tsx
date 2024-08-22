import React from 'react';
import CollapseWrap from '../common/Collapse';

const CustomPolicy = ({ title, content }) => {
    return <div className="bg-white box-shadow mt-4 p-4">
        <CollapseWrap
            title={title}
            showMoreBtn
            content={content}
        />
    </div>
};

export default CustomPolicy;