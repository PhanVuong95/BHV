import React from "react";
import FlexBox from "../../common/FlexBox";
import { DatePicker, Text } from "zmp-ui";
import moment from "moment";

function PeriodItem() {
    return (
        <div className="p-4 pb-24">
            <Text.Title className="font-medium text-lg leading-6 pt-6 pb-2">
                Thời hạn bảo hiểm
            </Text.Title>
            <FlexBox className="border-b pb-4">
                <div className="pr-1">
                    <DatePicker
                        placeholder="Ngày bắt đầu"
                        mask
                        maskClosable
                        dateFormat="dd/mm/yyyy"
                        title="Ngày bắt đầu"
                        defaultValue={new Date(moment().toISOString())}
                    />
                </div>
                <FlexBox className="h-[50px] items-center p-2">
                    <div
                        className="border-b w-3"
                        style={{ borderColor: "lightgray" }}
                    />
                </FlexBox>
                <div className="pl-1" style={{ pointerEvents: "none" }}>
                    <DatePicker
                        placeholder="Placeholder"
                        mask
                        maskClosable
                        disabled
                        dateFormat="dd/mm/yyyy"
                        value={
                            new Date(
                                moment()
                                    .add(1, "years")
                                    .toISOString()
                            )
                        }
                    />
                </div>
            </FlexBox>
        </div>
    );
}

export default PeriodItem;
