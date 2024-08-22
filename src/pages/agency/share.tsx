import React, { useCallback, useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { useRecoilValue } from "recoil";
import { Icon, Page, Text } from "zmp-ui";
import CustomButton from "../../components/common/CustomButton";
import FlexBox from "../../components/common/FlexBox";
import Loading from "../../components/common/Loading";
import ResponsiveQRCode from "../../components/common/ResponsiveQRCode";
import LayoutHeader from "../../components/layouts/LayoutHeader";

import Navigation from "../../components/layouts/Navigation";
import config from "../../contants/config";
import { EQrCodeType } from "../../enums";
import { DeepLinkStateType } from "../../hooks/useHandleDeeplink";
import withLogin from "../../hooks/withLogin";
import { getReferrerSetting, IReferrerSetting } from "../../services/referrer";
import { getZaloTagFollower, openUrlInWebview, shareLink } from "../../services/zalo";
import { globalState, userState } from "../../state";
import "react-tagsinput/react-tagsinput.css";

import copy from "copy-to-clipboard";
import { ReactTags, Tag } from "react-tag-autocomplete";
import "react-tag-autocomplete/example/src/styles.css"


const AgencySharePage: React.FunctionComponent = () => {
  const { addToast } = useToasts();
  const [setting, setsetting] = useState<IReferrerSetting | undefined>();
  const [lstTag, setlstTag] = useState<[] | undefined>();

  const user = useRecoilValue(userState);
  const globalValue = useRecoilValue(globalState);

  useEffect(() => {
    getReferrerSetting().then((res) => setsetting(res));
  }, []);

  useEffect(() => {
    getZaloTagFollower().then((res) => {
      console.log(res)
      setlstTag(res?.data?.map(x => ({ label: x, value: x })));
    })
  }, []);

  const deepLinkState: DeepLinkStateType = {
    data: {
      referrerId: String(user.id),
      callback: "/home",
    },
    type: EQrCodeType.REFER,
  };
  const [isBlur, setBlur] = useState<boolean>(false);
  const [selected, setSelected] = useState([])

  const onAdd = useCallback(
    (newTag) => {
      setBlur(true);
      setSelected([...selected, newTag])
      setBlur(false);
    },
    [selected]
  )

  const onDelete = useCallback(
    (tagIndex) => {
      setBlur(true);
      setSelected(selected.filter((_, i) => i !== tagIndex))
      setBlur(false);
    },
    [selected]
  )


  const versionQuery = config?.DEV ? config.VITE_ZALO_ENV : "";
  const deeplink =
    config.VITE_DEEP_LINK +
    "?" +
    versionQuery + "&" +
    new URLSearchParams({
      state: btoa(JSON.stringify(deepLinkState)),
    }).toString() + "&tags=" + encodeURIComponent(selected?.map(x => x.value).join(';'));
  return (
    <Page className="page">
      <div className="body pb-24" style={{ paddingTop: 0 }}>
        <LayoutHeader showBackIcon />

        {(setting && (
          <div className="pt-11 pb-24">
            <div className="p-6">
              <>
                <Text className="text-xs mt-6 mb-2">
                  Tải xuống QR code sau và chia sẻ trên các nền tảng khác:
                </Text>
                <ReactTags
                  labelText="Chọn nhãn cần gắn"
                  selected={selected}
                  suggestions={lstTag}
                  onAdd={onAdd}
                  onDelete={onDelete}
                  noOptionsText="Không tìm thấy nhãn"
                  placeholderText="Chọn nhãn cần gắn"
                />

                <div className={isBlur ? "blur-effect" : ""}>
                  <ResponsiveQRCode value={deeplink} />
                </div>


                <FlexBox className="items-center flex-col">
                  <CustomButton
                    content="Lấy đường dẫn chia sẻ"
                    onClick={() => {
                      try {
                        copy(deeplink);
                        addToast("Đã copy", {
                          appearance: "success",
                          autoDismiss: true,
                        });
                      } catch (error) {
                        console.error(error);
                        addToast("Có lỗi xảy ra", {
                          appearance: "error",
                          autoDismiss: true,
                        });
                      }
                    }}
                    className="mb-4"
                  />
                  <FlexBox
                    className="bg-red items-center bg-cyan-800 text-white pt-2 pb-2 pl-4 pr-4 text-xs mb-2"
                    onClick={() => {
                      shareLink(deeplink);
                    }}
                    style={{
                      borderRadius: 10,
                      width: "max-content",
                    }}
                  >
                    Chia sẻ cho bạn bè trên zalo
                    <Icon icon="zi-send-solid" className="ml-4" />
                  </FlexBox>
                </FlexBox>
                <Text className="text-xs italic mt-4 mb-2 text-center">
                  Chính sách Affiliate vui lòng tham khảo trên website của công
                  ty{" "}
                  <span
                    className="text-blue-700 font-bold"
                    onClick={() => {
                      if (globalValue?.config?.affiliateDocUrl)
                        openUrlInWebview(globalValue.config.affiliateDocUrl);
                    }}
                  >
                    Tại đây
                  </span>
                </Text>
              </>
            </div>
          </div>
        )) || <Loading />}
      </div>
      <Navigation />
    </Page>
  );
};

export default withLogin(AgencySharePage);
