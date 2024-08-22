import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Input, Modal, Text } from "zmp-ui";
import { checkDiscountCode, IVoucher } from "../../../services/referrer";
import { referrerState } from "../../../state";
import Empty from "../../common/Empty";
import FlexBox from "../../common/FlexBox";
import moment from "moment";
import useFormatter from "../../../hooks/useFormatter";
import Loading from "../../common/Loading";
import CustomInput from "../../common/CustomInput";

type Props = {
  discountCode: string;
  onOk: (code: string) => void;
};

const SearchDiscountCode = ({ discountCode, onOk }: Props) => {
  const { formatter } = useFormatter();
  const referrerValue = useRecoilValue(referrerState);
  const [search, setsearch] = useState("");
  const [loading, setloading] = useState(false);

  const [availableVoucher, setavailableVoucher] = useState<
    IVoucher | null | undefined
  >();

  const [modalAddVoucherVisible, setmodalAddVoucherVisible] =
    useState<boolean>(false);

  const handleSearch = useCallback(
    debounce((value: string) => {
      setsearch(value);
    }, 500),
    []
  );

  useEffect(() => {
    setloading(true);
    checkDiscountCode(search, referrerValue.referrerId)
      .then((res) => setavailableVoucher(res))
      .finally(() => {
        setloading(false);
      });
  }, [search]);

  return (
    <>
      <Modal
        style={{ background: "rgba(0,0,0,0.1)", zIndex: 120000 }}
        visible={modalAddVoucherVisible}
        title="Thêm mã giảm giá"
        onClose={() => {
          setmodalAddVoucherVisible(false);
        }}
        zIndex={120000}
        actions={[
          {
            text: "Đóng",
            close: true,
          },
        ]}
        description={
          (
            <div>
              <CustomInput
                placeholder="Tìm mã giảm giá"
                className="text-sm h-10"
                onChange={(e) => handleSearch(e.target.value)}
              />
              {(loading && <Loading />) ||
                (!availableVoucher && (
                  <Empty
                    className="pt-4"
                    description="Không tìm thấy mã giảm giá"
                  />
                )) || (
                  <div className="mt-2">
                    <Text className="font-bold">
                      {availableVoucher?.planName}
                    </Text>
                    <Text className="text-gray-500 text-xs mt-4 mb-4">
                      {availableVoucher?.description}
                    </Text>
                    <Text className="text-red-700">
                      Giảm {formatter.format(availableVoucher?.value || 0)}
                    </Text>
                    <FlexBox>
                      <Text className="text-xs text-gray-500">
                        {moment(availableVoucher?.startDate).format(
                          "DD/MM/YYYY"
                        )}
                        {" - "}
                      </Text>
                      <Text className="text-xs text-gray-500">
                        {moment(availableVoucher?.endDate).format("DD/MM/YYYY")}
                      </Text>
                    </FlexBox>
                    <FlexBox
                      onClick={() => {
                        if (availableVoucher) onOk(search?.trim());
                        setmodalAddVoucherVisible(false);
                      }}
                      className="pt-2"
                    >
                      <Text className="text-blue-600 font-semibold">
                        Áp dụng ngay
                      </Text>
                    </FlexBox>
                  </div>
                )}
            </div>
          ) as any
        }
      />
      <div onClick={() => setmodalAddVoucherVisible(true)}>
        <Text className="text-blue-600 text-xs pb-2 block">
          {discountCode
            ? `Mã giảm giá: ${discountCode}. Nhập mã khác?`
            : "Bạn có mã giảm giá? Nhấn để thêm mã"}
        </Text>
      </div>
    </>
  );
};

export default SearchDiscountCode;
