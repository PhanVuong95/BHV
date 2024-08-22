import React from "react";
import { Box, Radio, Text } from "zmp-ui";

type Props = {
  setMedicalHistory: (medicalHistory: boolean[]) => void;
  medicalHistory: [boolean, boolean, boolean];
};

const checkList: { lable: string }[] = [
  {
    lable: "Mắc bệnh ung thư?",
  },
  {
    lable: "Đã từng bị đột quỵ?",
  },
  {
    lable:
      "Bị suy thận mạn giai đoạn 4 trở lên; hoặc bị biến chứng của tiểu đường; hoặc bị suy tim độ 3 trở lên; hoặc bị bệnh động mạch vành?",
  },
];

const MedicalHistory = ({ setMedicalHistory, medicalHistory }: Props) => {
  return (
    <div>
      <Box className="px-4 pb-8" style={{ paddingTop: 22 }}>
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
        <Text className="text-justify pt-4">
          Trước khi tham gia bảo hiểm theo Hợp đồng bảo hiểm này, Người được bảo
          hiểm đã từng được bất kỳ cơ sở y tế hay nhân viên y tế nào xác định:
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

export default MedicalHistory;
