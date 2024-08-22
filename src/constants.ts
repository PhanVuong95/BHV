export const CLOUD_FRONT_HOST =
  process.env.CLOUD_FRONT_HOST || "https://df5tnwfq42mjn.cloudfront.net";
export const ACCESS_TOKEN_KEY = "accessToken";
export const DEFAULT_PAGE_SIZE = 15;
export const ONE_HOUR_IN_SECONDS = 60 * 60;
export const ONE_DAY_IN_SECONDS = 24 * ONE_HOUR_IN_SECONDS;
export const POLICY_AUTO = [
  {
    type: "inline-text",
    content: [
      {
        type: "text",
        content:
          "✓ Quỹ thiệt hại về sức khỏe, tính mạng do xe cơ giới gây ra là ",
      },
      {
        type: "hightlight",
        content: "150 triệu đồng/người/vụ tai nạn",
      },
    ],
  },
  {
    type: "inline-text",
    content: [
      {
        type: "text",
        content: "✓ Quỹ thiệt hại về tài sản do ô tô gây ra là",
      },
      {
        type: "hightlight",
        content: " 100 triệu đồng/người/vụ tai nạn",
      },
    ],
  },
  {
    type: "inline-text",
    content: [
      {
        type: "text",
        content: "✓ Bảo hiểm hiệu lực:",
      },
      {
        type: "hightlight",
        content: " 365 ngày",
      },
    ],
  },
  {
    type: "text",
    content:
      "✓ Báo ngay cho cảnh sát giao thông hoặc cơ quan công an, chính quyền địa phương để phối hợp giải quyết tai nạn, đồng thời lập tức liên hệ hotline trên giấy chứng nhận bảo hiểm hoặc tổng đài HOTLINE, thông báo tổn thất và cung cấp thông tin vụ việc để nhận hướng dẫn cụ thể:",
  },
  {
    type: "list",
    content: [
      {
        type: "text",
        content:
          "Tên chủ xe, tên lái xe, số điện thoại, địa chỉ;",
      },
      {
        type: "text",
        content:
          "Biển kiểm soát, số giấy chứng nhận bảo hiểm, hiệu lực bảo hiểm;",
      },
      {
        type: "text",
        content: "Ngày giờ, địa điểm nơi xảy ra tai nạn;",
      },

      {
        type: "text",
        content: "Số lượng người, hàng trên xe;",
      },
      {
        type: "text",
        content: "Thiệt hại về người, tài sản sơ bộ;",
      },
      {
        type: "text",
        content: "Diễn biến tai nạn sơ bộ.",
      },
      {
        type: "text",
        content: "Chụp ảnh hiện trường (nếu có thể);",
      },
    ],
  },
]

export const POLICY_CONDITIONAL_AUTO = [
  {
    type: "text",
    content:
      "✓ Điều kiện áp dụng: Cho các trường hợp thuộc phạm vi bảo hiểm",
  },
  {
    type: "text",
    content: "✓ Được tạm ứng chi phí từ công ty bảo hiểm",
  },
  {
    type: "text",
    content: "❤️️ Vui lòng liên hệ chúng tôi để được làm rõ",
    className: "pt-1 pb-1 block",
  },
  {
    type: "text",
    content:
      "Điều khoản loại trừ với các trường hợp thiếu/vi phạm các nội dung sau:",
    className: "mt-4",
  },
  {
    type: "text",
    content:
      "❌ Giấy chứng nhận bảo hiểm và/hoặc Hợp đồng bảo hiểm và các thỏa thuận khác bằng văn bản (nếu có)",
    className: "pl-6 pt-1",
  },
  {
    type: "text",
    content:
      "❌ Giấy đăng ký xe, Giấy phép lái xe hợp lệ của Người Điều Khiển Xe;",
    className: "pl-6 pt-1",
  },
  {
    type: "text",
    content:
      "❌ Giấy chứng nhận kiểm định an toàn kỹ thuật và bảo vệ môi trường phương tiện giao thông cơ giới đường bộ hợp lệ,",
    className: "pl-6 pt-1",
  },
  {
    type: "text",
    content:
      "❌ Hóa đơn, chứng từ hợp lệ về việc sửa chữa, thay mới tài sản bị thiệt hại;",
    className: "pl-6 pt-1",
  },
  {
    type: "text",
    content:
      "❌ Các giấy tờ chứng minh chi phí cần thiết và hợp lý mà Bên Mua Bảo Hiểm đã chi ra để giảm thiểu tổn thất hay để thực hiện theo chỉ dẫn của công ty bảo hiểm (nếu có).",
    className: "pl-6 pt-1",
  },
]