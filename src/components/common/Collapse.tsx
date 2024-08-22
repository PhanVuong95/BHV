import React, { useState } from "react";
import { Icon, Text } from "zmp-ui";
import FlexBox from "./FlexBox";
import { IconArrowColor } from "../svgs/ChevronRightSvg";

export interface IContentItem {
  content: string | IContentItem[];
  type: "list" | "text" | "hightlight" | "inline-text";
  style?: React.CSSProperties;
  className?: string;
}

export const RenderContentItem = ({
  contentItem,
  parentContent,
}: {
  contentItem: IContentItem;
  parentContent?: IContentItem;
}) => {
  const TextEl =
    parentContent?.type === "inline-text"
      ? (props: any) => <span {...props} />
      : Text;
  return (
    <>
      {(contentItem.type === "hightlight" && (
        <TextEl
          className={"whitespace-pre-wrap text-sm ".concat(
            contentItem.className || ""
          )}
          style={{ ...contentItem.style }}
        >
          {String(contentItem.content)}
        </TextEl>
      )) ||
        (parentContent?.type === "list" && (
          <li
            className={"text-sm text-gray-600 ".concat(
              contentItem.className || ""
            )}
          >
            {String(contentItem.content)}
          </li>
        )) ||
        (contentItem.type === "text" && (
          <TextEl
            className={"whitespace-pre-wrap text-sm text-gray-700 ".concat(
              contentItem.className || ""
            )}
            style={{ ...contentItem.style }}
          >
            {String(contentItem.content)?.split('').map((itemMap)=>{
              if(itemMap === '✓') return <span  className="text-primary-color">{itemMap}</span>
              else return itemMap
            })}
          </TextEl>
        )) || (
          <RenderContentItemList
            parentContent={contentItem}
            contentItem={contentItem.content as IContentItem[]}
          />
        )}
    </>
  );
};

export const RenderContentItemList = ({
  contentItem,
  parentContent,
}: {
  contentItem: IContentItem[];
  parentContent?: IContentItem;
}) => {
  if (parentContent?.type === "list")
    return (
      <>
        <ul
          style={{
            display: "block",
            listStyleType: "disc",
            marginBlockStart: "1em",
            marginBlockEnd: "1em",
            marginInlineStart: "0px",
            marginInlineEnd: "0px",
            paddingInlineStart: "40px",
          }}
        >
          {(contentItem as IContentItem[]).map((item) => (
            <RenderContentItem
              key={Math.random()}
              contentItem={item}
              parentContent={parentContent}
            />
          ))}
        </ul>
      </>
    );
  if (parentContent?.type === "inline-text")
    return (
      <>
        <div>
          {(contentItem as IContentItem[]).map((item) => (
            <RenderContentItem
              contentItem={item}
              parentContent={parentContent}
            />
          ))}
        </div>
      </>
    );

  return (
    <>
      <div>
        {(contentItem as IContentItem[]).map((item) => (
          <RenderContentItem contentItem={item} />
        ))}
      </div>
    </>
  );
};

const CollapseWrap = ({
  content,
  title,
  defaultOpen = false,
  height = 94,
  showMoreBtn = false,
}: {
  content: IContentItem | IContentItem[];
  title: string;
  defaultOpen?: boolean;
  height?: number;
  showMoreBtn?: boolean;
}) => {
  const [open, setopen] = useState(defaultOpen);

  return (
    <div>
      <FlexBox
        className="items-center justify-between pb-2"
        onClick={() => setopen(!open)}
      >
        <div className="fw-600 fs-16" >{title}</div>
        {!showMoreBtn && <Icon icon="zi-chevron-down" />}
      </FlexBox>
      <div
        style={{
          transition: "max-height 0.5s ease-in-out",
          maxHeight: !open ? height : "1000px",
          overflow: "hidden",
        }}
      >
        {((content as IContentItem).type && (
          <RenderContentItem contentItem={content as IContentItem} />
        )) || <RenderContentItemList contentItem={content as IContentItem[]} />}
      </div>
      {showMoreBtn && (
        <div
          className="text-center text-xs text-primary-color fw-600"
          onClick={() => setopen(!open)}
        >
          <hr style={{margin:'12px 0px'}} />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <span className="fw-600 fs-14"> {!open ? "Mở rộng" : "Thu gọn"}</span>
            <span style={{ marginLeft: '4px', position: 'relative', top: '-1px', transform: `rotate(${!open ? '0deg' : '180deg'})` }}>
              <IconArrowColor />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollapseWrap;
