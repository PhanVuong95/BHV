import React from "react";
import { Text } from "zmp-ui";
import FlexBox from "./FlexBox";

export interface IShowFieldsData {
  header: string | React.ReactNode;
  items: {
    lable: string | React.ReactNode;
    value?: string | number | React.ReactNode;
    style?: React.CSSProperties;
  }[];
  style?: React.CSSProperties;
}

export const ShowFieldsData = ({
  datas,
  half = true,
}: {
  datas: IShowFieldsData[];
  half?: boolean;
}) => (
  <>
    {datas.map((data) => (
      <>
        <div
          className="custom-card mt-0 pb-4" key={data.header as any}>
          <Text
            className="pt-3 pr-3 pl-3 fs-14 fw-600"
            style={{ ...data.style, color: '#2E2E2E' }}
          >
            {data.header}
          </Text>
          {data.items.map((item) => (
            <FlexBox
              key={item.lable as any}
              className="pt-3 justify-between pl-3 pr-3"
              style={{
                ...item.style,
              }}
            >
              <div
                className="text-gray-500 pr-1 flex-1"
                style={{
                  fontSize: '12px',
                  color: '#646464',
                  maxWidth:'50%',
                  ...(!half && {
                    width: "unset",
                  }),
                }}
              >
                {item.lable}
              </div>
              <div
                className="pl-2"
                style={{
                  fontSize: '12px',
                  color: '#2E2E2E',
                  fontWeight:600,
                  ...(!half && {
                    width: "unset",
                  }),
                }}
              >
                {item.value}
              </div>
            </FlexBox>
          ))}
        </div>
      </>

    ))}
  </>
);
