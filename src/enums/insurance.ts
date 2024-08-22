export enum EInsuranceFeature {
  // trach nhiem dan su bat buoc

  MOTOR_01 = "MOTOR_01",
  AUTO_01 = "AUTO_01",
  HOME_01 = "HOME_01",
  FIRE_01 = "FIRE_01",
  HEALTH_02 = "HEALTH_02",
  PERSONAL_01 = "PERSONAL_01", //Tai nạn cá nhân
  TRAVEL_01 = "TRAVEL_01",
  TRAVEL_02 = "TRAVEL_02",
  HEALTH_01 = "HEALTH_01",
  PERSONAL_02 = "PERSONAL_02", //Tai nạn mở rộng
  STUDENT_01 = "STUDENT_01",
  BHXH_01 = "BHXH_01",
  OTHER_01 = "OTHER_01",
}

// TODO: rename
export enum EInsuranceSource {
  PVI = "PVI",
  BSH = "BSH",
  VBI = "VBI",
  MIC = "MIC",
  BIC = "BIC",
  DNP = "DNP",
  OTHER = "OTHER",
}

export enum EMotorCategoryValue {
  CC50Down = "CC50Down",
  CC50Up = "CC50Up",
  Electric = "Electric",
  Other = "Other", // 3 bánh + xe gắn máy khác
}

export enum EInsuranceGroup {
  INSURANCE = "MOTOR",
  DOCUMENT = "DOCUMENT",
  CLAIM = "CLAIM",
}

export enum EInsuranceStatus {
  PURCHASED = "PURCHASED",
  CART = "CART",
  OTHER = "OTHER",
}

export enum ECategory {
  LOAIXEAUTO = "LOAIXEAUTO", // loại xe ô tô
  HIEUXEAUTO = "HIEUXEAUTO", // Danh sách hiệu xe
  DONGXE = "DONGXE", // danh sách dòng xe
  HIEUXEMOTOR = "HIEUXEMOTOR", // Hiệu xe xe máy
  LOAIXEMOTOR = "LOAIXEMOTOR", // Loại xe xe máy
  MDSD_AUTO = "MDSD_AUTO", // Mục đích sử dụng xe oto
  MDSD_VBI_AUTO = "MDSD_VBI_AUTO", // Mục đích sử dụng xe oto
  MDSD_BSH_AUTO = "MDSD_BSH_AUTO", // Mục đích sử dụng xe oto
  LOAIHINH_AUTO = "LOAIHINH_AUTO", // Mục đích sử dụng xe oto

  PERSONAL_ACCIDENT_PACKAGE = "PERSONAL_ACCIDENT_PACKAGE",
  DOMESTIC_TRAVEL_PACKAGE = "DOMESTIC_TRAVEL_PACKAGE",
  DOMESTIC_TRAVEL_TYPE = "DOMESTIC_TRAVEL_TYPE",
  OVERSEA_TRAVEL_PACKAGE = "OVERSEA_TRAVEL_PACKAGE",
  OVERSEA_TRAVEL_AREA = "OVERSEA_TRAVEL_AREA",
  FIRE_PACKAGES = "FIRE_PACKAGES",
  HOME_PACKAGES = "HOME_PACKAGES",
  CANCER_PACKAGES = "CANCER_PACKAGES",
  STUDENT_PACKAGES = "STUDENT_PACKAGES",
  BHXH_PACKAGES = "BHXH_PACKAGES",
  HEALTH_PACKAGES = "HEALTH_PACKAGES",
  DKBS_VBI_AUTO = "VBI_DKBS", //DKBS VBI
  EXTENDED_ACCIDENT_PACKAGES = "EXTENDED_ACCIDENT_PACKAGES",
  BIZ_TYPES = "BIZ_TYPES",

  // Danh mục danh riêng cho sản phẩm tài sản
  DIADIEM_BH = "DIADIEM_BH",
  MUCDICH_SD = "MUCDICH_SD",
  MAHIEU_RUIRO = "MAHIEU_RUIRO",

  PROVINCE = "PROVINCE",
  AUTO_TYPE = "AUTO_TYPE",
  BHXH = "BHXH",
}

export enum EPersonalAccidentPackageValue {
  BRONZE = "0101",
  SILVER = "0102",
  GOLD = "0103",
  PLATINUM = "0104",
  DIAMOND = "0105",
}

export enum EPVIDomesticTravelPackageValue {
  PACKAGE_01 = "PACKAGE_01",
  PACKAGE_02 = "PACKAGE_02",
  PACKAGE_03 = "PACKAGE_03",
  PACKAGE_04 = "PACKAGE_04",
  PACKAGE_05 = "PACKAGE_05",
  PACKAGE_06 = "PACKAGE_06",
}
export enum EBSHDomesticTravelPackageValue {
  TRV_01 = "GOI1",
  TRV_02 = "GOI2",
  TRV_03 = "GOI3",
}
export enum EBSHDomesticTravelTypeValue {
  TYPE_1 = "Personal",
  TYPE_2 = "Family",
}
export enum EBICDomesticTravelPackageValue {
  TRV_01 = "20",
  TRV_02 = "19",
  TRV_03 = "18",
  TRV_04 = "17",
  TRV_05 = "16",
  TRV_06 = "15",
  TRV_07 = "14",
  TRV_08 = "13",
  TRV_09 = "12",
  TRV_10 = "11",
  TRV_11 = "10",
  TRV_12 = "9",
  TRV_13 = "8",
  TRV_14 = "7",
  TRV_15 = "6",
  TRV_16 = "5",
  TRV_17 = "4",
  TRV_18 = "3",
  TRV_19 = "2",
  TRV_20 = "1",
}
export enum EPVIOverseaTravelPackageValue {
  PACKAGE_01 = "PACKAGE_01",
  PACKAGE_02 = "PACKAGE_02",
  PACKAGE_03 = "PACKAGE_03",
  PACKAGE_04 = "PACKAGE_04",
  PACKAGE_05 = "PACKAGE_05",
  PACKAGE_06 = "PACKAGE_06",
}

export enum EBSHOverseaTravelPackageValue {
  PACKAGE_01 = "PACKAGE_01",
  PACKAGE_02 = "PACKAGE_02",
  PACKAGE_03 = "PACKAGE_03",
  PACKAGE_04 = "PACKAGE_04",
  PACKAGE_05 = "PACKAGE_05",
  PACKAGE_06 = "PACKAGE_06",
}

export enum EBICOverseaTravelPackageValue {
  PLAN_A = "1",
  PLAN_B = "2",
  PLAN_C = "3",
  PLAN_D = "4",
  PLAN_E = "5",
}

export enum EBICCancerPackageValue {
  PLAN_A = "1",
  PLAN_B = "2",
  PLAN_C = "3",
  PLAN_D = "4",
}

export enum EBICExtendedAccidentPackageValue {
  PLAN_A = "1",
  PLAN_B = "2",
  PLAN_C = "3",
  PLAN_D = "4",
}

export enum EAreaValue {
  ATW = "ATW",
  ASI = "ASI",
  ASE = "ASE", // ATW: toàn cầu, ASI: châu á (trừ nhật, úc, new zeland), ASE: đông nam á
}

export enum EHomePackageValue {
  BRONZE = "F01",
  SILVER = "F02",
  GOLD = "F03",
  DIAMOND = "F04",
}

export enum EAutoUserIntentValue {
  N = "N", // người - không kd
  N_K = "N_K", // người - kinh doanh
  H = "H", // hàng - không kd
  H_K = "H_K", // hàng - kinh doanh
  KD = "KD", // kinh doanh
  KKD = "KKD", // không kinh doanh
}

export enum EAutomonthValue {
  T3 = "T3",
  T6 = "T6",
  T9 = "T9",
}

export enum EAutoTypeValue {
  XEN1 = "XEN1", // X	Xe chở người - Xe không kinh doanh
  XEN2 = "XEN2", // X	Xe chở người - Xe chạy trong khu nội bộ
  XEN3 = "XEN3", // X	Xe chở người - Xe khách liên tỉnh
  XEN4 = "XEN4", // X	Xe chở người - Xe bus
  XEN5 = "XEN5", // X	Xe chở người - Xe grab và loại hình tương tự
  XEN6 = "XEN6", // X	Xe chở người - Xe taxi, cho thuê tự lái
  XEN7 = "XEN7", // X	Xe chở người - Xe tập lái
  XEN8 = "XEN8", // X	Xe chở người - Xe cứu thương
  XEN10 = "XEN10", // X	Xe chở người - Xe kinh doanh khác

  XEH1 = "XEH1", // X	Xe chở hàng - Xe rơ mooc
  XEH2 = "XEH2", // X	Xe chở hàng - Xe tải trên 10 tấn
  XEH3 = "XEH3", // X	Xe chở người - Xe đầu kéo, xe đông lạnh trên 3.5 tấn
  XEH4 = "XEH4", // X	Xe chở hàng - Xe kinh doanh vận tải hàng hóa
  XEH5 = "XEH5", // X	Xe chở hàng - Xe trong vùng khoáng sản
  XEH6 = "XEH6", // X	Xe chở hàng -  Xe chở hàng còn lại
  XEH7 = "XEH7", // X	Xe chở hàng - Xe chở tiền
  XEH8 = "XEH8", // X	Xe chở hàng - Xe ô tô chuyên dùng khác

  XET1 = "XET1", // X	Xe chở hàng - Xe bán tải
  XET2 = "XET2", // X	Xe chở hàng - Xe chở hàng còn lại
}

export enum EPVIFirePackageValue {
  PACKAGE_01 = "PACKAGE_01",
  PACKAGE_02 = "PACKAGE_02",
  PACKAGE_03 = "PACKAGE_03",
  PACKAGE_04 = "PACKAGE_04",
  PACKAGE_05 = "PACKAGE_05",
  PACKAGE_06 = "PACKAGE_06",
}

export enum EPVIFireBizTypeValue {
  KARA = "KARA", // 0.2
  RETAIL = "RETAIL", // 0.4
  GAS_PETRO = "GAS_PETRO", // 0.3
}

export enum EBICHealthPackageValue {
  //  12 Cơ bản; 1 Đồng; 2 Bạc; 3 Vàng; 4 Bạch Kim; 5 Kim Cương;
  BASIC = "12",
  BRONZE = "1",
  SILVER = "2",
  GOLD = "3",
  PLATINUM = "4",
  DIAMOND = "5",
}
export enum VBIHealthPackageValue {
  BRONZE = "NEW_BAN_LE_DONG",
  SILVER = "NEW_BAN_LE_BAC",
  TITAN = "NEW_BAN_LE_TITAN",
  GOLD = "NEW_BAN_LE_VANG",
  PLATINUM = "NEW_BAN_LE_BACH_KIM",
  DIAMOND = "NEW_BAN_LE_KIM_CUONG",
}
export enum BSHHealthPackageValue {
  GOLD = "GOLD",
  PLATINUM = "PLATINUM",
}
export enum MICHealthPackageValue {
  BRONZE = "1",
  SILVER = "2",
  GOLD = "3",
  PLATINUM = "4",
  DIAMOND = "5",
}
export enum MICVTSKHealthPackageValue {
  PACKAGE_01 = "TCBL_ANTAM",
  PACKAGE_02 = "TCBL_TINTUONG",
  PACKAGE_03 = "TCBL_MANHKHOE",
  PACKAGE_04 = "TCBL_HANHPHUC",
}
export enum MICHealthTypeValue {
  TYPE_01 = "MIC_CARE",
  TYPE_02 = "MIC_VTSK",
}
export enum BSHHealthTypeValue {
  TYPE_01 = "PERSONAL",
  TYPE_02 = "FAMILY",
}

export enum ECalculationFeature {
  // trach nhiem dan su bat buoc
  BHXH_TUNGUYEN = "BHXH_TUNGUYEN",
  voluntary = "voluntary-social-insurance",
  FirstStepFillData = "voluntary-social-first",
}
