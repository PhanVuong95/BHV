import { atom } from "recoil";
import { EGender } from "./enums";
import {
  EAutoUserIntentValue,
  EHomePackageValue,
  EInsuranceSource,
  EMotorCategoryValue,
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
  EAutoTypeValue,
  MICHealthPackageValue,
  MICHealthTypeValue,
  EAutomonthValue,
  VBIHealthPackageValue,
  BSHHealthPackageValue,
  BSHHealthTypeValue,
  EBSHDomesticTravelTypeValue,
} from "./enums/insurance";
import {
  ICreateAutoInsuranceParams,
  ICreateHomeInsuranceParams,
  ICreateMotorInsuranceParams,
  ICreatePersonalAccidentInsuranceParams,
  ICreateDomesticTravelInsuranceParams,
  IInsuranceFeatureResponse,
  IInsuranceGroupResponse,
  IInsuranceResponse,
  ICreateOverseaTravelInsuranceParams,
  ICreateHealthInsuranceParams,
  ICreateStudentInsuranceParams,
  ICreateFireInsuranceParams,
  ICreateCancerInsuranceParams,
  ICreateCancerAttachedPerson,
  ICreateHealthAttachedPerson,
  ICreateExtendedAccidentInsuranceParams,
  ICreateExtendedAccidentAttachedPerson,
  ICreateBHXHInsuranceParams,
} from "./interfaces/insurance";
import { IUser } from "./services/user";
import { IAppConfig } from "./interfaces";
import moment from "moment";
import { string } from "prop-types";

export const defaultMotorFormData: ICreateMotorInsuranceParams = {
  userName: "",
  userAddress: "",
  licensePlates: "",
  email: "",
  phone: "",
  category: EMotorCategoryValue.CC50Up,
  mfgDate: "",
  expiry: 1,
  identityCardNum: "",
  startDate: new Date(),
  occupantInsurance: 0,
  source: EInsuranceSource.PVI,
  chassisNumber: "",
  engineNumber: "",
};

export const defaultAutoFormData: ICreateAutoInsuranceParams = {
  userName: "",
  userAddress: "",
  email: "",
  phone: "",
  identityCardNum: "",

  userIntent: EAutoUserIntentValue.N_K,
  [EInsuranceSource.PVI]: {
    type: "", // loai xe - MIC
    automaker: "", // hieu xe -code
    label: "", // dong xe - code
  },
  [EInsuranceSource.BSH]: {
    type: "", // loai xe - MIC
    automaker: "", // hieu xe -code
    label: "", // dong xe - code
  },

  [EInsuranceSource.MIC]: {
    type: EAutoTypeValue.XEN10, // loai xe - MIC
    automaker: "", // hieu xe -code
    label: "", // dong xe - code
  },
  [EInsuranceSource.VBI]: {
    type: "NHOM.01", // loai xe - MIC
    automaker: "AUDI", // hieu xe -code
    label: "A1", // dong xe - code
  },
  seats: 2,
  vehicleLoad: 0, // tai trong - kg
  occupantInsurance: 0, // $/người/vụ

  mfgDate: "2021",
  licensePlates: "",
  chassisNumber: "", // so khung

  startDate: new Date().toISOString(),
  expiry: 1,
  source: EInsuranceSource.PVI,
};

export const defaultBHXHFormData: ICreateBHXHInsuranceParams = {
  userName: "",
  userAddress: "",
  email: "",
  phone: "",
  identityCardNum: "",
  personNum: 1,
  monthIntent: EAutomonthValue.T3,
  startDate: "",
  customerPrice: 1000000,
  gender: EGender.MALE,
  birthday: "",
  attachedList: [
    {
      fullName: "",
      gender: EGender.FEMALE,
      birthday: moment().subtract(18, "years").valueOf(),
      address: "",
      identityCardNum: "",
    },
  ],
  source: EInsuranceSource.DNP,
  [EInsuranceSource.DNP]: {
    package: "",
  },
};

export const defaultHomeInsuranceFormData: ICreateHomeInsuranceParams = {
  package: EHomePackageValue.BRONZE, // ma_chuongtrinh

  province: "",
  district: "",
  ward: "",

  locationCode: "",
  riskCode: "",
  usesCode: "",

  userName: "",
  expiry: 6, // month
  startDate: new Date(),
  email: "",
  userAddress: "",
  address: "",
  identityCardNum: "",
  phone: "",
  yearBuilt: "",

  source: EInsuranceSource.PVI,
  discountCode: "",
};

export const defaultPersonalAccidentFormData: ICreatePersonalAccidentInsuranceParams =
  {
    package: EPersonalAccidentPackageValue.BRONZE, // ma_chuongtrinh
    // người thụ hưởng
    beneficiaryName: "",
    beneficiaryAddress: "",

    startDate: new Date(),
    phone: "",
    identityCardNum: "",
    userName: "",
    userAddress: "",
    email: "",
    gender: EGender.MALE,
    birthday: moment().subtract(18, "years").valueOf(),
    attachedList: [],
    hasComplementary: false,
    source: EInsuranceSource.PVI,
  };

export const defaultDomesticTravelFormData: ICreateDomesticTravelInsuranceParams =
  {
    startDate: new Date(),
    phone: "",
    identityCardNum: "",
    userName: "",
    userAddress: "",
    email: "",
    gender: EGender.MALE,
    trip: "",
    birthday: moment().subtract(18, "years").valueOf(),
    attachedList: [
      {
        fullName: "",
        gender: EGender.FEMALE,
        birthday: moment().subtract(18, "years").valueOf(),
        address: "",
        identityCardNum: "",
      },
    ],
    duration: 4,
    personNum: 1,
    source: EInsuranceSource.PVI,

    [EInsuranceSource.PVI]: {
      package: EPVIDomesticTravelPackageValue.PACKAGE_01, // ma_chuongtrinh
    },
    [EInsuranceSource.BSH]: {
      package: EBSHDomesticTravelPackageValue.TRV_01, // ma_chuongtrinh
      type: EBSHDomesticTravelTypeValue.TYPE_1,
    },
    [EInsuranceSource.BIC]: {
      package: EBICDomesticTravelPackageValue.TRV_01, // ma_chuongtrinh
    },
  };
export const defaultOverseaTravelFormData: ICreateOverseaTravelInsuranceParams =
  {
    startDate: new Date(),
    phone: "",
    identityCardNum: "",
    userName: "",
    userAddress: "",
    email: "",
    gender: EGender.MALE,
    trip: "",
    birthday: moment().subtract(18, "years").valueOf(),
    attachedList: [
      {
        fullName: "",
        gender: EGender.FEMALE,
        birthday: moment().subtract(18, "years").valueOf(),
        address: "",
        identityCardNum: "",
      },
    ],
    duration: 4,
    personNum: 1,
    over70personNum: 0,
    source: EInsuranceSource.PVI,

    [EInsuranceSource.PVI]: {
      package: EPVIOverseaTravelPackageValue.PACKAGE_01, // ma_chuongtrinh
      area: EAreaValue.ATW,
    },
    [EInsuranceSource.BSH]: {
      package: EBSHOverseaTravelPackageValue.PACKAGE_01, // ma_chuongtrinh
      area: EAreaValue.ATW,
    },
    [EInsuranceSource.BIC]: {
      package: EBICOverseaTravelPackageValue.PLAN_A, // ma_chuongtrinh
      area: EAreaValue.ATW,
    },
  };

export const defaultFireInsuranceFormData: ICreateFireInsuranceParams = {
  // người thụ hưởng
  beneficiaryName: "",
  beneficiaryAddress: "",

  startDate: new Date(),
  identityCardNum: "",
  userName: "",
  userAddress: "",
  gender: EGender.FEMALE,
  birthday: moment().subtract(18, "years").valueOf(),

  phone: "",
  email: "",

  province: "",
  district: "",
  ward: "",

  address: "",

  yearBuilt: "",
  riskCode: "",
  usesCode: "",
  locationCode: "",

  [EInsuranceSource.PVI]: {
    package: EPVIFirePackageValue.PACKAGE_01,
    bizType: EPVIFireBizTypeValue.RETAIL,
  },

  source: EInsuranceSource.PVI,
  discountCode: "",
};

export const userState = atom<IUser>({
  key: "user",
  default: {
    id: "",
    name: "",
    avatar: "",
    phone: "",
    createdAt: new Date(),
  },
});

export const globalState = atom<{
  activeCommingSoonFeaturePopup: boolean;
  logged: boolean;
  config?: IAppConfig;
}>({
  key: "global",
  default: {
    activeCommingSoonFeaturePopup: false,
    logged: false,
  },
});

export const defaultHealthAttachPerson: ICreateHealthAttachedPerson = {
  fullName: "",
  gender: EGender.FEMALE,
  birthday: moment().subtract(18, "years").valueOf(),
  address: "",
  identityCardNum: "",
  phone: "",
  bicDentistry: false,
  bicMaternity: false,
  bicMedicalHistory: [false, false, false, false, false, false],
  micAdditionalBenefits: {
    bs1: false,
    bs2: false,
    bs3: false,
    bs4: false,
  },
  micVTSKAdditionalBenefits: {
    bs01: false,
    bs02: false,
  },
  micMedicalHistory: [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    "",
  ],
  micVTSKMedicalHistory: [false, false, false],
  vbiAdditionalBenefits: {
    bs1: false,
    bs2: false,
    bs3: false,
    bs4: false,
  },
};

export const defaultHealthInsuranceFormData: ICreateHealthInsuranceParams = {
  startDate: new Date(),
  phone: "",
  identityCardNum: "",
  userName: "",
  userAddress: "",
  email: "",
  gender: EGender.MALE,
  birthday: moment().subtract(18, "years").valueOf(),
  attachedList: [defaultHealthAttachPerson],
  personNum: 1,
  source: EInsuranceSource.PVI,

  [EInsuranceSource.BIC]: {
    package: EBICHealthPackageValue.BASIC, // ma_chuongtrinh
  },
  [EInsuranceSource.MIC]: {
    type: MICHealthTypeValue.TYPE_01,
    package: MICHealthPackageValue.BRONZE,
  },
  [EInsuranceSource.VBI]: {
    package: VBIHealthPackageValue.BRONZE,
  },
  [EInsuranceSource.BSH]: {
    type: BSHHealthTypeValue.TYPE_01,
    package: BSHHealthPackageValue.GOLD,
  },
};

export const defaultStudentInsuranceFormData: ICreateStudentInsuranceParams = {
  startDate: new Date(),
  phone: "",
  identityCardNum: "",
  userName: "",
  userAddress: "",
  email: "",
  gender: EGender.MALE,
  birthday: moment().subtract(18, "years").valueOf(),
  attachedList: [
    {
      fullName: "",
      gender: EGender.FEMALE,
      birthday: moment().subtract(18, "years").valueOf(),
      address: "",
      identityCardNum: "",
      schoolName: "",
    },
  ],
  personNum: 1,
  source: EInsuranceSource.PVI,

  [EInsuranceSource.BIC]: {
    package: 1, // ma_chuongtrinh
  },
  [EInsuranceSource.BSH]: {
    package: 1, // ma_chuongtrinh
  },
};

export const defaultCancerAttachPerson: ICreateCancerAttachedPerson = {
  fullName: "",
  gender: EGender.FEMALE,
  birthday: moment().subtract(18, "years").valueOf(),
  address: "",
  identityCardNum: "",
  beneficiaryName: "",
  beneficiaryIdentityCardNum: "",
  beneficiaryRelationship: "",
  bicIsStroke: false,
  bicMedicalHistory: [false, false, false],
};

export const defaultCancerInsuranceFormData: ICreateCancerInsuranceParams = {
  startDate: new Date(),
  phone: "",
  identityCardNum: "",
  userName: "",
  userAddress: "",
  email: "",
  gender: EGender.MALE,
  birthday: moment().subtract(18, "years").valueOf(),
  attachedList: [defaultCancerAttachPerson],
  personNum: 1,
  source: EInsuranceSource.PVI,

  [EInsuranceSource.BIC]: {
    package: EBICCancerPackageValue.PLAN_A, // ma_chuongtrinh
  },
};

export const defaultExtendedAccidentAttachPerson: ICreateExtendedAccidentAttachedPerson =
  {
    fullName: "",
    gender: EGender.FEMALE,
    birthday: moment().subtract(18, "years").valueOf(),
    address: "",
    identityCardNum: "",
  };

export const defaultExtendedAccidentInsuranceFormData: ICreateExtendedAccidentInsuranceParams =
  {
    startDate: new Date(),
    phone: "",
    identityCardNum: "",
    userName: "",
    userAddress: "",
    email: "",
    gender: EGender.MALE,
    birthday: moment().subtract(18, "years").valueOf(),
    attachedList: [defaultCancerAttachPerson],
    personNum: 1,
    source: EInsuranceSource.PVI,

    [EInsuranceSource.BIC]: {
      package: EBICExtendedAccidentPackageValue.PLAN_A, // ma_chuongtrinh
    },
  };

export const insuranceServicesState = atom<{
  features: IInsuranceFeatureResponse[];
  groups: IInsuranceGroupResponse[];
  defaultMotorData: ICreateMotorInsuranceParams;
  defaultAutoData: ICreateAutoInsuranceParams;
  defaultPersonalAccidentData: ICreatePersonalAccidentInsuranceParams;
  defaultDomesticTravelData: ICreateDomesticTravelInsuranceParams;
  defaultOverseaTravelData: ICreateOverseaTravelInsuranceParams;
  defaultHomeData: ICreateHomeInsuranceParams;
  defaultHealthData: ICreateHealthInsuranceParams;
  defaultStudentData: ICreateStudentInsuranceParams;
  defaultBHXHData: ICreateBHXHInsuranceParams;
  defaultCancerData: ICreateCancerInsuranceParams;
  defaultExtendedAccidentData: ICreateExtendedAccidentInsuranceParams;
  defaultFireData: ICreateFireInsuranceParams;
  insuranceEditting?: IInsuranceResponse;
}>({
  key: "insuranceFeatures",
  default: {
    features: [],
    groups: [],
    defaultMotorData: defaultMotorFormData,
    defaultAutoData: defaultAutoFormData,
    defaultPersonalAccidentData: defaultPersonalAccidentFormData,
    defaultDomesticTravelData: defaultDomesticTravelFormData,
    defaultOverseaTravelData: defaultOverseaTravelFormData,
    defaultHomeData: defaultHomeInsuranceFormData,
    defaultHealthData: defaultHealthInsuranceFormData,
    defaultStudentData: defaultStudentInsuranceFormData,
    defaultBHXHData: defaultBHXHFormData,
    defaultFireData: defaultFireInsuranceFormData,
    defaultCancerData: defaultCancerInsuranceFormData,
    defaultExtendedAccidentData: defaultExtendedAccidentInsuranceFormData,
  },
});

export const referrerState = atom<{
  referrerId?: string;
  discountCode?: string;
}>({
  key: "referrer",
  default: {},
});
