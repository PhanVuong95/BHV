
import React from "react";
import { Header, useNavigate } from "zmp-ui";
import { ChevronRightSvg, ChevronRightSvgV2 } from "../svgs/ChevronRightSvg";
import { LogoSvg } from "../svgs/LogoSvg";

type Props = {
    transparent?: boolean;
    showBackIcon?: boolean;
    title?: any;
    onBackClick?: () => void;
};

const LayoutHeaderV2 = ({
    transparent,
    showBackIcon = false,
    onBackClick,
    title = ''
}: Props) => {
    const navigate = useNavigate();
    return (
        <Header
            title={<span style={{ color: 'white', fontSize: '16px', fontWeight: 600 }} >{title}</span> as any}
            className="bg-gradient"
            style={{
                ...(transparent && {
                    backgroundColor: "rgba(0,0,0,0)",
                    background: "unset",
                }),
            }}
            backIcon={
                <span style={{position:'relative',top:'2px'}}>
                    <ChevronRightSvgV2/>
                </span>
            }
            showBackIcon={showBackIcon}
            {...((showBackIcon || onBackClick) && {
                onBackClick: () => {
                    if (onBackClick) {
                        onBackClick();
                    } else {
                        navigate(-1);
                    }
                },
            })}
        />
    );
};

export default LayoutHeaderV2;
