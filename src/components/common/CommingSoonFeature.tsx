import React from "react";
import { useRecoilState } from "recoil";
import { Modal, Text } from "zmp-ui";
import { globalState } from "../../state";

type Props = {};

const CommingSoonFeature = (props: Props) => {
  const [global, setGlobal] = useRecoilState(globalState);
  return (
    <Modal
      visible={global.activeCommingSoonFeaturePopup}
      title="Chúng tôi đang cập nhật"
      zIndex={1200}
      onClose={() =>
        setGlobal((global) => ({
          ...global,
          activeCommingSoonFeaturePopup: false,
        }))
      }
      actions={[
        {
          text: "Đồng ý",
          highLight: true,
          close: true,
        },
      ]}
      description={
        (
          <Text className="text-center">
            Vui lòng liên hệ chat với Hotline nhé!
          </Text>
        ) as any
      }
    />
  );
};

export default CommingSoonFeature;
