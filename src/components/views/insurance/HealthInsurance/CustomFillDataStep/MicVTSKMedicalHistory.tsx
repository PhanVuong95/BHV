import React, { useCallback } from "react";
import { Box, Input, Radio, Text } from "zmp-ui";
import CustomInput from "../../../../common/CustomInput";

type Props = {
  setMedicalHistory: (medicalHistory: any[]) => void;
  medicalHistory: [boolean, boolean, boolean];
};
const checkList: { lable: string }[] = [
  {
    lable:
      "Người được bảo hiểm có bệnh/Hội chứng được liệt kê dưới đây không :? \n"
      + "- Bị tâm thần, bệnh phong, bệnh/hội chứng down, tự kỷ \n" 
      + "- Thương tật vĩnh viễn từ 50% trở lên \n"
      + "- Bị ung thư và/ hoặc đang trong quá trình điều trị bệnh/thương tật \n"
  },
  {
    lable:
      "Người được bảo hiểm có bệnh/Hội chứng sau không : \n"
      + "Bệnh viêm hệ thống thần kinh trung ương, teo hệ thống ảnh hưởng lên hệ thần kinh trung ương, alzheimer, bệnh bại não, bệnh về mạch máu não, bệnh rối loại tuyến giáp, đái tháo đường, bệnh của cầu thận, ống thận, sỏi thân, hội chứng thận hư, các bệnh của máu, rối loạn đông máu, rối loạn chức năng của bạch cầu hạt trung tính, bệnh liên quan mô bạch huyết?" 
  },
  {
    lable:
      "Người được bảo hiểm có đã hoặc đang: \n"
    + "Điều trị thương tật, các bệnh tật khác chưa được liệt kê trong vòng 03 năm gần đây hoặc \n"
    + "Từng thay thế bộ phận giả, cắt/bỏ/mất chức năng của các bộ phận cơ thể hoặc; \n"
    + "Biết được tình trạng cần phải được điều trị tại cơ sở y tế trong vòng 12 tháng tiếp theo? \n"
  },
];

const MicVTSKMedicalHistory = ({ setMedicalHistory, medicalHistory }: Props) => {
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

export default MicVTSKMedicalHistory;
