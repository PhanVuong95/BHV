import React from 'react';
import "./style.css"
import { TERM_AND_USE } from './terms';
import LayoutHeader from '../../components/layouts/LayoutHeader';
const TermsAndUse: React.FunctionComponent = () => {
    return (
        <div className='wrap-block-terms-and-use'>
            <LayoutHeader showBackIcon />
            <div className='wrap-block-terms-and-use-title' style={{marginTop:32}}>
                Điều khoản sử dụng
            </div>
            {
                TERM_AND_USE.map((itemMap, key) => <div className='mb-24'>
                    <div className='wrap-block-terms-and-use-title'>
                        {key + 1}. {itemMap.title}:
                    </div>
                    {
                        itemMap.content.map((itemMapSub, keySub) => <div className='wrap-block-terms-and-use-content mt-6'>
                            {`${itemMap.showSttOrder !== false ? `${key + 1}.${keySub + 1}` : ''}`} {itemMapSub}
                        </div>)
                    }
                </div>)
            }

        </div>
    );
};

export default TermsAndUse;