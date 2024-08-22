import React from "react";
import { Box, Radio, Text } from "zmp-ui";

type Props = {
  setMedicalHistory: (medicalHistory: boolean[]) => void;
  medicalHistory: [boolean, boolean, boolean, boolean, boolean, boolean];
};

const checkList: { lable: string }[] = [
  {
    lable:
      "Bạn hoặc bất kỳ thành viên nào trong gia đình hoặc người được bảo hiểm nào mắc bệnh bẩm sinh, khuyết tật hay thương tật nào không?",
  },
  {
    lable:
      "Bạn hoặc bất kỳ thành viên nào trong gia đình hoặc người được bảo hiểm nào mắc bệnh bẩm sinh, khuyết tật hay thương tật nào không?",
  },
  {
    lable:
      "Bạn hoặc bất kỳ thành viên nào trong gia đình hoặc người được bảo hiểm nào mắc bệnh bẩm sinh, khuyết tật hay thương tật nào không?",
  },
  {
    lable:
      "Người được bảo hiểm có tham gia hợp đồng bảo hiểm sức khỏe tại BIC hoặc tại Công ty bảo hiểm khác trong vòng 5 năm gần đây không?",
  },
  {
    lable:
      "Người được bảo hiểm đã từng yêu cầu bồi thường bảo hiểm y tế, tại nạn con người tại BIC chưa?",
  },
  {
    lable:
      "Người được bảo hiểm đã bao giờ bị một công ty bảo hiểm từ chối nhận bảo hiểm hoặc từ chối tái tục hợp đồng bảo hiểm sức khỏe hoặc được chấp nhận nhưng có các điều khoản bổ sung đặc biệt đi kèm chưa?",
  },
];

const BICMedicalHistory = ({ setMedicalHistory, medicalHistory }: Props) => {
  return (
    <div>
      <Box className="px-4" style={{ paddingTop: 22 }}>
        <Text.Title className="font-bold text-xl">
          Tình trạng sức khoẻ
        </Text.Title>
        <Text.Title className="font-bold text-xl">
          của người được bảo hiểm
        </Text.Title>

        <Text className="text-gray-500 pt-2">
          (Lưu ý: trả lời chính xác vì câu trả lời có ảnh hưởng đến hồ sơ bồi
          thường)
        </Text>

        {checkList.map((item, index) => (
          <Box className="border-t border-b py-6 my-2" key={item.lable}>
            <Text.Title className="pb-4">
              {`${index + 1}, ${item.lable}`}
            </Text.Title>
            <Radio.Group
              defaultValue={Boolean(medicalHistory[index]) ? 1 : 0}
              className="justify-around flex"
              onChange={(e) => {
                setMedicalHistory(
                  medicalHistory.map((i, pos) => (pos === index ? e == 1 : i))
                );
              }}
            >
              <Radio value={1} size="small" label="Có" />
              <Radio value={0} defaultChecked size="small" label="Không" />
            </Radio.Group>
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default BICMedicalHistory;
