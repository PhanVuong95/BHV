import React, { useCallback } from "react";
import { Box, Input, Radio, Text } from "zmp-ui";
import CustomInput from "../../../../common/CustomInput";

type Props = {
  setMedicalHistory: (medicalHistory: any[]) => void;
  medicalHistory: [boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean,
    boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean,
    boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean,
    boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean,
    boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean,
    boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean,
    boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean,
    boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean,
    boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean,
    boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean,
    string
    ];
};
const checkList: { lable: string }[] = [
  {
    lable:
      "Người được bảo hiểm có thuộc các trường hợp dưới đây hay không? \n"
      + "- Những người bị bệnh tâm thần, bệnh phong, hội chứng down, tự kỷ \n" 
      + "- Những người bị thương tật vĩnh viễn từ 50% trở lên \n"
      + "- Những người đang trong thời gian điều trị bệnh hoặc thương tật hoặc bị ung thư \n"
      + "Điều này chỉ áp dụng đối với các trường hợp tham gia bảo hiểm năm đầu tiên.\n"
  },
  {
    lable:
      "Trong vòng 3 năm qua, Người được bảo hiểm đã từng được chẩn đoán, xuất hiện triệu chứng phải đi khám, điều trị hay đã được chuyên gia y tế khuyên Người được bảo hiểm phải điều trị hay không? \n"
      + "Lưu ý: \n" 
      + "Người được bảo hiểm không trả lời ‘CÓ” đối với các bệnh/ tình trạng y tế dưới đây: \n" 
      + "- Phụ nữ sinh con (sinh thường, sinh mổ) mà không có biến chứng thai sản \n" 
      + "- Cúm và cảm lạnh theo mùa thông thường, viêm dạ dày cấp tính, viêm ruột thừa cấp tính, viêm amidan cấp tính, nhiễm trùng đường tiết niệu, bệnh tả, thương hàn, sốt xuất huyết mà Người được bảo hiểm đã được điều trị và đã hồi phục hoàn toàn hoặc nếu Người được bảo hiểm sử dụng bất kỳ loại thực phẩm bổ sung sức khỏe tổng quát nào. \n" 
  },
  {
    lable:
      "Viêm hệ thần kinh trung ương (Não) ?",
  },
  {
    lable:
      "Parkinson, Alzheimer?",
  },
  {
    lable:
      "Thoái hóa khác của hệ thần kinh?",
  },
  {
    lable:
      "Mất trí nhớ, hôn mê, bại não, liệt?",
  },
  {
    lable:
      "Bỏng dưới độ III?",
  },
  {
    lable:
      "Bỏng nặng từ độ III trở lên?",
  },
  {
    lable:
      "Hội chứng Apallic?",
  },
  {
    lable:
      "Phẫu thuật não?",
  },
  {
    lable:
      "Viêm màng não, viêm não do virus?",
  },
  {
    lable:
      "Bệnh tế bảo thân kinh vận động?",
  },
  {
    lable:
      "Xơ cứng rải rác (đa xơ cứng)?",
  },
  {
    lable:
      "Loạn dưỡng cơ?",
  },
  {
    lable:
      "Nhược cơ?",
  },
  {
    lable:
      "Suy phổi, tràn khí phổi, suy hô hấp mãn tính?",
  },
  {
    lable:
      "Phẫu thuật cất bỏ 1 bên phổi?",
  },
  {
    lable:
      "Tăng áp động mạch phối?",
  },
  {
    lable:
      "Bệnh phổi giai đoạn cuối?",
  },
  {
    lable:
      "Tim?",
  },
  {
    lable:
      "Tăng áp lực động mạch vành vô căn?",
  },
  {
    lable:
      "Mạch máu não/đột quy (xuất huyết não, xơ cứng động mạch)?",
  },
  {
    lable:
      "Nhồi máu cơ tim, suy tìm mắt bù, bệnh tim giai đoạn cuối?",
  },
  {
    lable:
      "Phẫu thuật động mạch chủ/van tim, ghép tim?",
  },
  {
    lable:
      "Phẫu thuật nối tắt động mạch vành?",
  },
  {
    lable:
      "Viêm gan A?",
  },
  {
    lable:
      "Viêm gan B?",
  },
  {
    lable:
      "Viêm gan C?",
  },
  {
    lable:
      "Viêm gan siêu vi tối cấp?",
  },
  {
    lable:
      "Xơ gan?",
  },
  {
    lable:
      "Bệnh Crohn?",
  },
  {
    lable:
      "Phẫu thuật gan?",
  },
  {
    lable:
      "Suy gan (bệnh gan giai đoạn cuối)?",
  },
  {
    lable:
      "Suy thận, teo thận, sỏi thận cả 2 bên?",
  },
  {
    lable:
      "Chạy thận nhân tạo?",
  },
  {
    lable:
      "Rối loạn tuyến giá?",
  },
  {
    lable:
      "Cường giáp?",
  },
  {
    lable:
      "Suy giáp?",
  },
  {
    lable:
      "Basedow (Bướu cổ)?",
  },
  {
    lable:
      "Tiểu đường chỉ số trên 11 mmol/l \n "
      + "Tiểu đường đã gây biến chứng",
  },
  {
    lable:
      "Tiểu đường chỉ số từ 8 - 10 mmol/l?",
  },
  {
    lable:
      "U xơ tử cung?",
  },
  {
    lable:
      "U nang buông trứng?",
  },
  {
    lable:
      "U xơ tiền liệt?",
  },
  {
    lable:
      "U thượng thận trái (đã cắt hoặc chưa cắt)?",
  },
  {
    lable:
      "Ung thư các loại?",
  },
  {
    lable:
      "Thiếu máu bất sản, thiếu máu tán huyết, thiếu máu do suy tủy?",
  },
  {
    lable:
      "Rối loạn đông máu?",
  },
  {
    lable:
      "Ghép tủy?",
  },
  {
    lable:
      "Suy tủy?",
  },
  {
    lable:
      "Lupus ban đỏ?",
  },
  {
    lable:
      "Xơ cứng bì toàn thân?",
  },
  {
    lable:
      "Teo cơ?",
  },
  {
    lable:
      "Viêm đa khớp dạng thấp nặng?",
  },
  {
    lable:
      "Loãng xương?",
  },
  {
    lable:
      "Loãng xương mức độ nặng?",
  },
  {
    lable:
      "Ghép tủy xương?",
  },
  {
    lable:
      "Điếc?",
  },
  {
    lable:
      "Bệnh hệ thống tạo keo (Collagen)?",
  },
  {
    lable:
      "Lao các loại?",
  },
  {
    lable:
      "Phong?",
  },
  {
    lable:
      "Bạch cầu?",
  },
  {
    lable:
      "Các bệnh lây qua đường tình dục: Giang mai, lậu, hội chứng suy giảm miễn dịch?",
  },
  {
    lable:
      "Bệnh bẩm sinh, di truyền, dị dạng về gen?",
  },
  {
    lable:
      "Nang ở tủy thận?",
  },
  {
    lable:
      "Hội chứng Đao (Down)?",
  },
  {
    lable:
      "Đục thủy tinh thể?",
  },
  {
    lable:
      "Mù 1 mắt trở lên?",
  },
  {
    lable:
      "Gai đôi cột sống?",
  },
  {
    lable:
      "Suy đa tạng?",
  },
  {
    lable:
      "Bệnh sốt rét?",
  },
  {
    lable:
      "Bệnh nghề nghiệp?",
  },
    {
    lable:
      "Điều trị lọc máu?",
  },
  {
    lable:
      "Rối loạn chức năng sinh dục?",
  },
  {
    lable:
      "Hở môi, hở hàm ếch?",
  },
  {
    lable:
      "Tích nước trong não?",
  },
  {
    lable:
      "Hẹp hậu môn, hẹp bao quy đầu?",
  },
  {
    lable:
      "Vẹo vách ngăn bẩm sinh?",
  },
  {
    lable:
      "Tâm thần/loạn thần kinh, tự kỉ?",
  },
  {
    lable:
      "Chậm phát triển, rối loạn thiếu tập trung?",
  },
];

const MicMedicalHistory = ({ setMedicalHistory, medicalHistory }: Props) => {
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
        <CustomInput
          label={(<Text className="text-gray-500 pt-2">
          Bệnh khác (Chỉ ghi kết luận trong vòng 3 năm gần đây)
      </Text>) as any}
          type="text"
          placeholder=""
          className="text-base mt-2 block"
          onChange={(e) => {
            const value = e?.target?.value;
            const updatedMedicalHistory = [...medicalHistory];
            updatedMedicalHistory[updatedMedicalHistory.length - 1] = value;
            setMedicalHistory(updatedMedicalHistory);
          }
        }
        />
      </Box>
    </div>
  );
};

export default MicMedicalHistory;
