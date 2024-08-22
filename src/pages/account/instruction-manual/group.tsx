import { flatten } from "lodash";
import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Icon, List, Page, Sheet, Spinner, Text } from "zmp-ui";
import Empty from "../../../components/common/Empty";
import LayoutHeader from "../../../components/layouts/LayoutHeader";
import useOA from "../../../hooks/useOA";
import withLogin from "../../../hooks/withLogin";
import { openUrlInWebview } from "../../../services/zalo";
import { globalState } from "../../../state";
import { ChevronRightSvg } from "../../../components/svgs/ChevronRightSvg";

const { Item } = List;

const InstructionManualGroupPage = () => {
  const { group } = useParams();

  const [visible, setvisible] = useState("");

  const { config } = useRecoilValue(globalState);

  if (!config) return <Spinner />;

  const { openChat } = useOA();

  const groupTitle = useMemo(
    () =>
      flatten(config.instructionManualGroups.map(({ items }) => items)).find(
        (item) => item.value === group
      )?.title,
    [config, group]
  );

  const items = config.instructionManuals.filter(
    (item) => item.group === group
  );
  if (!config) return <Spinner />;
  return (
    <Page className="page ">
      <div className="body pt-11 " style={{ background: "rgb(243 243 243)" }}>
        <LayoutHeader
          showBackIcon
          title={<Text className="text-sm text-white">{groupTitle}</Text>}
        />
        <div className="rounded-xl bg-white shadow" style={{background:'white',borderRadius:'unset'}}>
          <List>
            {[...items].map(({ title, url, keywords }) => (
              <Item
              style={{marginBottom:'0px'}}
                onClick={() => {
                  setvisible(url);
                }}
                title={title}
                suffix={<ChevronRightSvg icon="zi-more-vert" />}
                subTitle={keywords.join(" - ")}
              />
            ))}
          </List>

          {!items.length && <Empty description="Đang cập nhật" />}
        </div>
      </div>

      <Sheet.Actions
        mask
        className="custom-sheet-action custom-sheet-action-v2"
        visible={!!visible}
        title={<span className="text-primary-color" style={{fontWeight:500}}>Chọn một hành động</span> as any}
        onClose={() => setvisible("")}
        swipeToClose
        maskClassName="custom-sheet-action-name"
        actions={[
          [
            {
              text: <span className="custom-sheet-action-span" style={{textAlign:'left'}}>Xem tài liệu</span> as any,
              onClick: () => {
                openUrlInWebview(visible);
              },
            },
            {
              text: "Chat với hỗ trợ viên về tài liệu này",
              onClick: () => {
                openChat("Tôi cần hỗ trợ về tài liệu này: " + visible);
              },
            },
          ],
          // [{ text: "Đóng", close: true }],
        ]}
      />
    </Page>
  );
};

export default withLogin(InstructionManualGroupPage);
