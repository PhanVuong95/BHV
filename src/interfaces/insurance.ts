import { SelectValue } from "zmp-ui/select";
import { EGender } from "../enums";
import {
  EAutoTypeValue,
  EAutoUserIntentValue,
  EHomePackageValue,
  EInsuranceFeature,
  EInsuranceGroup,
  EInsuranceSource,
  EPersonalAccidentPackageValue,
  EPVIDomesticTravelPackageValue,
  EPVIOverseaTravelPackageValue,
  EBICDomesticTravelPackageValue,
  EBICOverseaTravelPackageValue,
  EAreaValue,
  EPVIFirePackageValue,
  EPVIFireBizTypeValue,
  EBSHDomesticTravelPackageValue,
  EBSHOverseaTravelPackageValue,
  EBICCancerPackageValue,
  EBICHealthPackageValue,
  EBICExtendedAccidentPackageValue,
  MICHealthPackageValue,
  MICHealthTypeValue,
  EAutomonthValue,
  VBIHealthPackageValue,
  BSHHealthPackageValue,
  BSHHealthTypeValue,
  EBSHDomesticTravelTypeValue,
} from "../enums/insurance";
import { IVoucher } from "../services/referrer";
import { IUser } from "../services/user";

export interface ICreateMotorInsuranceParams {
  userName: string;
  userAddress: string;
  phone: string;
  identityCardNum: string;

  licensePlates: string;
  category: string;
  expiry: number;
  startDate: string | number | Date;
  label?: string;
  mfgDate?: string;
  email?: string;
  referrerId?: string;
  discountCode?: string;
  occupantInsurance: number; // số tiền /người /vụ
  source: EInsuranceSource;
  chassisNumber: string;
  engineNumber: string;
}

export interface ICreatePersonalAccidentAttachedPerson {
  fullName: string;
  gender: EGender;
  birthday: string | number | Date;
  address: string;
  identityCardNum: string;
  email?: string;
  phone?: string;
}

export interface ICreateTravelAttachedPerson {
  fullName: string;
  gender: EGender;
  birthday: string | number | Date;
  address: string;
  identityCardNum: string;
  email?: string;
  phone?: string;
}

export interface ICreatePersonalAccidentInsuranceParams {
  package: EPersonalAccidentPackageValue; // ma_chuongtrinh
  // người thụ hưởng
  beneficiaryName: string;
  beneficiaryAddress: string;

  startDate: string | number | Date;
  phone: string;
  identityCardNum: string;
  userName: string;
  userAddress: string;
  email: string;
  gender: EGender;
  birthday: string | number | Date;
  attachedList: ICreatePersonalAccidentAttachedPerson[];
  hasComplementary?: boolean;
  personNum?: string;
  source: EInsuranceSource;
  discountCode?: string;
}

export interface ICreateDomesticTravelInsuranceParams {
  startDate: string | number | Date;
  duration: number; // day
  personNum: number;

  trip: string;
  identityCardNum: string;
  userName: string;
  userAddress: string;
  gender: EGender;
  birthday: string | number | Date;

  phone: string;
  email: string;

  attachedList: ICreateTravelAttachedPerson[];
  source: EInsuranceSource;
  discountCode?: string;

  [EInsuranceSource.PVI]: {
    package: EPVIDomesticTravelPackageValue; // ma_chuongtrinh
  };
  [EInsuranceSource.BSH]: {
    package: EBSHDomesticTravelPackageValue; // ma_chuongtrinh
    type: EBSHDomesticTravelTypeValue;
  };
  [EInsuranceSource.BIC]: {
    package: EBICDomesticTravelPackageValue; // ma_chuongtrinh
  };
}

export interface ICreateOverseaTravelInsuranceParams {
  startDate: string | number | Date;
  duration: number; // day
  personNum: number;
  over70personNum: number;

  trip: string;
  identityCardNum: string;
  userName: string;
  userAddress: string;
  gender: EGender;
  birthday: string | number | Date;

  phone: string;
  email: string;

  attachedList: ICreateTravelAttachedPerson[];
  source: EInsuranceSource;
  discountCode?: string;

  [EInsuranceSource.PVI]: {
    package: EPVIOverseaTravelPackageValue; // ma_chuongtrinh
    area: EAreaValue.ATW;
  };
  [EInsuranceSource.BSH]: {
    package: EBSHOverseaTravelPackageValue; // ma_chuongtrinh
    area: EAreaValue.ATW;
  };
  [EInsuranceSource.BIC]: {
    package: EBICOverseaTravelPackageValue; // ma_chuongtrinh
    area: EAreaValue;
  };
}

export interface ICreateFireInsuranceParams {
  transactionId?: string;
  // người thụ hưởng
  beneficiaryName: string;
  beneficiaryAddress: string;

  startDate: string | number | Date;
  identityCardNum: string;
  userName: string;
  userAddress: string;
  gender: EGender;
  birthday: string | number | Date;

  phone: string;
  email: string;

  province: string;
  district: string;
  ward: string;

  yearBuilt: string;
  riskCode: string;
  usesCode: string;
  locationCode: string;
  address: string;

  [EInsuranceSource.PVI]: {
    package: EPVIFirePackageValue; // ma_chuongtrinh
    bizType: EPVIFireBizTypeValue;
  };

  source: EInsuranceSource;
  discountCode?: string;
}

export interface ICreateHealthAttachedPerson {
  fullName: string;
  gender: EGender;
  birthday: string | number | Date;
  address: string;
  identityCardNum?: string;
  phone: string;

  bicDentistry: boolean;
  bicMaternity: boolean;
  bicMedicalHistory: [boolean, boolean, boolean, boolean, boolean, boolean];
  micAdditionalBenefits: {
    bs1: boolean;
    bs2: boolean;
    bs3: boolean;
    bs4: boolean;
  };
  micVTSKAdditionalBenefits: {
    bs01: boolean;
    bs02: boolean;
  };
  micMedicalHistory: [
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    string
  ];
  micVTSKMedicalHistory: [boolean, boolean, boolean];
  vbiAdditionalBenefits: {
    bs1: boolean;
    bs2: boolean;
    bs3: boolean;
    bs4: boolean;
  };
}
export interface ICreateHealthInsuranceParams {
  transactionId?: string;

  startDate: string | number | Date;
  personNum: number;

  identityCardNum: string;
  userName: string;
  userAddress: string;
  gender: EGender;
  birthday: string | number | Date;

  phone: string;
  email: string;

  attachedList: ICreateHealthAttachedPerson[];
  hasComplementary?: boolean;

  source: EInsuranceSource;

  [EInsuranceSource.BIC]: {
    package: EBICHealthPackageValue; // ma_chuongtrinh
  };
  [EInsuranceSource.MIC]: {
    type: MICHealthTypeValue;
    package: MICHealthPackageValue; // ma_chuongtrinh
  };
  [EInsuranceSource.VBI]: {
    package: VBIHealthPackageValue; // ma_chuongtrinh
  };
  [EInsuranceSource.BSH]: {
    type: BSHHealthTypeValue;
    package: BSHHealthPackageValue; // ma_chuongtrinh
  };
  discountCode?: string;
}
export interface ICreateStudentAttachedPerson {
  fullName: string;
  gender: EGender;
  birthday: string | number | Date;
  address: string;
  identityCardNum?: string;
  schoolName: string;
}

export interface ICreateStudentInsuranceParams {
  transactionId?: string;

  startDate: string | number | Date;
  personNum: number;

  identityCardNum: string;
  userName: string;
  userAddress: string;
  gender: EGender;
  birthday: string | number | Date;

  phone: string;
  email: string;

  attachedList: ICreateStudentAttachedPerson[];

  source: EInsuranceSource;

  [EInsuranceSource.BIC]: {
    package: number; // ma_chuongtrinh
  };
  [EInsuranceSource.BSH]: {
    package: number; // ma_chuongtrinh
  };
  discountCode?: string;
}

//insuran volunteer
export interface ICreateBHXHAttachedPerson {
  fullName: string;
  gender: EGender;
  birthday: string | number | Date;
  address: string;
  identityCardNum?: string;
  idinsurance: string;
}

export interface ICreateBHXHInsuranceParams {
  transactionId?: string;
  monthIntent: EAutomonthValue; // code
  startDate: string | number | Date;
  personNum: number;
  customerPrice: number;
  identityCardNum: string;
  userName: string;
  userAddress: string;
  gender: EGender;
  birthday: string | number | Date;
  phone: string;
  email: string;
  attachedList: ICreateBHXHAttachedPerson[];
  source: EInsuranceSource;
  [EInsuranceSource.DNP]: {
    package: string; // ma_chuongtrinh
  };
}

export interface ICreateCancerAttachedPerson {
  fullName: string;
  gender: EGender;
  birthday: string | number | Date;
  address: string;
  identityCardNum?: string;

  beneficiaryName: string;
  beneficiaryIdentityCardNum: string;
  beneficiaryRelationship: string;
  bicIsStroke: boolean;
  bicMedicalHistory: [boolean, boolean, boolean];
}

export interface ICreateCancerInsuranceParams {
  transactionId?: string;

  startDate: string | number | Date;
  personNum: number;

  identityCardNum: string;
  userName: string;
  userAddress: string;
  gender: EGender;
  birthday: string | number | Date;

  phone: string;
  email: string;

  attachedList: ICreateCancerAttachedPerson[];

  source: EInsuranceSource;

  [EInsuranceSource.BIC]: {
    package: EBICCancerPackageValue; // ma_chuongtrinh
  };
  discountCode?: string;
}
export interface ICreateExtendedAccidentAttachedPerson {
  fullName: string;
  gender: EGender;
  birthday: string | number | Date;
  address: string;
  identityCardNum?: string;
}
export interface ICreateExtendedAccidentInsuranceParams {
  transactionId?: string;

  startDate: string | number | Date;
  personNum: number;

  identityCardNum: string;
  userName: string;
  userAddress: string;
  gender: EGender;
  birthday: string | number | Date;
  phone: string;
  email: string;

  attachedList: ICreateExtendedAccidentAttachedPerson[];
  hasComplementary?: boolean;
  source: EInsuranceSource;

  [EInsuranceSource.BIC]: {
    package: EBICExtendedAccidentPackageValue; // ma_chuongtrinh
  };
  discountCode?: string;
}

export interface ICreateInternationalTravelInsuranceParams {
  package: EPVIDomesticTravelPackageValue; // ma_chuongtrinh
  startDate: string | number | Date;
  phone: string;
  identityCardNum: string;
  userName: string;
  userAddress: string;
  email: string;
  gender: EGender;
  birthday: string | number | Date;
  attachedList: ICreateTravelAttachedPerson[];
  internationalDestination: string;
  hasComplementary?: boolean;
  source: EInsuranceSource;
  discountCode?: string;
}

export interface ICreateHomeInsuranceParams {
  package: EHomePackageValue; // ma_chuongtrinh
  province: string;
  district: string;
  ward: string;

  locationCode: string;
  riskCode: string;
  usesCode: string;

  userName: string;
  expiry: number;
  startDate: string | number | Date;
  email: string;
  userAddress: string;
  address: string;
  identityCardNum: string;
  phone: string;
  yearBuilt: string;

  source: EInsuranceSource;
  discountCode?: string;
}

export interface ICreateOtherInsuranceParams {
  userName: string;
  expiry: number;
  startDate: string | number | Date;
  email: string;
  userAddress: string;
  address: string;
  identityCardNum: string;
  phone: string;
  source: EInsuranceSource;
  featureSource: string;
  dob: string;
  sex: string;
}

export interface ISelectLocationParams {
  province: string;
  district: string;
  ward: string;
}

export interface IInsuranceFee {
  total: number;
  compulsory: number;
  voluntary: number;

  // personal accident
  packageFees?: {
    [key in EPersonalAccidentPackageValue]?: { benefit: number[] };
  };
  homePackageFee?: {
    values: number[]; // 4
    rate: {
      [month in 6 | 12]: number;
    };
    tax: 0.1;
  };
  travelPackageFee?: { ratePerDay: number; tax: number; values: number[] };
  benefitUrl?: string;
  ruleUrl?: string;
}

export interface IInsuranceFeeDetails {
  fee: IInsuranceFee;
  discount: number;
  availableVoucher?: IVoucher;
  directReferrer?: IUser;
}

export interface ICreateAutoInsuranceParams {
  userName: string;
  userAddress: string;
  email: string;
  phone: string;
  identityCardNum?: string;
  category?: string;

  userIntent: EAutoUserIntentValue; // code
  seats: number;
  vehicleLoad: number; // tai trong - kg
  // type: string;

  mfgDate?: string;
  licensePlates: string;
  chassisNumber?: string;
  engineNumber?: string;

  occupantInsurance: number; // số tiền /người /vụ

  startDate: string | number | Date;
  expiry: number;
  referrerId?: string;
  discountCode?: string;
  source: EInsuranceSource;

  [EInsuranceSource.PVI]: {
    type: string; // loai xe - MIC
    automaker?: string; // hieu xe -code
    label?: string; // dong xe - code
  };
  [EInsuranceSource.BSH]: {
    type: string; // loai xe - MIC
    automaker?: string; // hieu xe -code
    label?: string; // dong xe - code
    group?: string;
  };
  [EInsuranceSource.MIC]: {
    type: EAutoTypeValue | ""; // loai xe - MIC
    automaker?: string; // hieu xe -code
    label?: string; // dong xe - code
  };
  [EInsuranceSource.VBI]: {
    type: string | ""; // loai xe - VBI
    automaker?: string; // hieu xe -code
    label?: string; // dong xe - code
  };
}

export interface ICategoryResponse {
  Text: string;
  Value: string | number;
}

export interface IAutoTypeResponse extends ICategoryResponse {
  userIntents: EAutoUserIntentValue[];
  Value: EAutoTypeValue;
  seatRange: {
    min: 1;
  };
}

export interface IBHXHTypeResponse extends ICategoryResponse {
  Value: EAutomonthValue;
}

export interface ILocationResponse {
  name: string;
  code: number | string;
  codename: string;
  division_type: string;
  short_codename: string;
  Value?: string;
  Text?: string;
}

export interface IProvinceResponse extends ILocationResponse {
  districts: (ILocationResponse & {
    wards: ILocationResponse[];
  })[];
}

export interface IInsuranceFeatureResponse {
  group: EInsuranceGroup;
  feature: EInsuranceFeature;
  title: string;
  description: string;
  thumbnail: string;
  isCommingSoon?: boolean;
  sources?: EInsuranceSource[];
}

export interface IInsuranceGroupResponse {
  title: string;
  value?: EInsuranceGroup;
}

export interface IInsuranceResponse {
  id: string;

  userId: string;
  data:
    | ICreateMotorInsuranceParams
    | ICreateAutoInsuranceParams
    | ICreatePersonalAccidentInsuranceParams
    | ICreateHomeInsuranceParams
    | ICreateOverseaTravelInsuranceParams
    | ICreateDomesticTravelInsuranceParams
    | ICreateOtherInsuranceParams;

  feature: EInsuranceFeature;

  transactionId: string;

  fee: number;

  createBody?: any;

  createResponse?: any;

  callbackResponse?: any;
  source: EInsuranceSource;
}

export type InsuranceDataType =
  | ICreateMotorInsuranceParams
  | ICreateAutoInsuranceParams
  | ICreatePersonalAccidentInsuranceParams
  | ICreateDomesticTravelInsuranceParams
  | ICreateOverseaTravelInsuranceParams
  | ICreateHomeInsuranceParams
  | ICreateStudentInsuranceParams
  | ICreateFireInsuranceParams
  | ICreateCancerInsuranceParams
  | ICreateHealthInsuranceParams
  | ICreateExtendedAccidentInsuranceParams
  | ICreateBHXHInsuranceParams
  | ICreateOtherInsuranceParams;
