import React from "react";
import { useRecoilValue } from "recoil";
import {
  List,
  Page,
  Spinner,
  useNavigate,
} from "zmp-ui";

import withLogin from "../../../hooks/withLogin";
import { globalState } from "../../../state";
import LayoutHeaderV2 from "../../../components/layouts/LayoutHeaderV2";
import CustomTitle from "../../../components/Title/CustomTitle";
const { Item } = List;

const InstructionManualPage = () => {
  const navigate = useNavigate();

  const { config } = useRecoilValue(globalState);

  if (!config) return <Spinner />;
  console.log(config.instructionManualGroups);
  return (
    <Page className="page ">
      <div className="body pt-11 " style={{ background: "rgb(243 243 243)" }}>
        <LayoutHeaderV2 title={'Tài liệu hướng dẫn'} showBackIcon />
        {config.instructionManualGroups.map(({ title, items }) => (
          <div className="rounded-xl bg-white shadow" style={{ borderRadius: 'unset', marginTop: 12 }} key={title}>
            {title && (
              <>
                <div style={{
                  padding: '16px 16px 0px 16px',
                }}>
                  <CustomTitle title={title} />
                </div>
                <div style={{ padding: '16px' }}>
                  <div style={{ width: '100%', height: '1px', background: '#e5e7eb' }}></div>
                </div>
              </>
            )}
            <div style={{ paddingLeft: '12px' }}>
              {
                items.map((itemMap, key, arr) => {
                  return <div
                    onClick={() => navigate(`/account/instruction-manual/${itemMap?.value}`)}
                    key={key} style={{ padding: '0px 16px 16px 16px' }}>
                    <div className={arr.length - 1 === key ? '' : 'border-b'} style={{ paddingBottom: '16px' }}>
                      <div style={{ color: '#2E2E2E', fontSize: '14px' }}>
                        {itemMap?.title}
                      </div>
                      <div style={{ color: '#646464', fontSize: '12px' }}>
                        {itemMap?.subTitle}
                      </div>
                    </div>
                  </div>
                })
              }
            </div>
          </div>
        ))}
      </div>
    </Page>
  );
};

export default withLogin(InstructionManualPage);
