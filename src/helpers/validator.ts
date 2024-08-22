export function isEmailValid(activeValidate: boolean, mail: string) {
  if (!activeValidate || !mail?.trim()) return true;
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail.trim())) {
    return true;
  }
  return "Email không hợp lệ";
}

export function isIdentityCardNumValid(
  activeValidate: boolean,
  identityCardNum?: string
) {
  if (!activeValidate) return true;
  if (!!identityCardNum && identityCardNum.length > 0) {
    return ![9, 12].includes(identityCardNum.length) && "CCCD/CMND không hợp lệ";
  } else {
    return "Hãy điền CCCD/CMND ";
  }
}

export const isEmpty = (activeValidate: boolean, data: string) => {
  if (!activeValidate) return true;
  if (String(data)?.trim()) return true;
  return "Không được để trống";
};
export const isValidPhoneNumber = (activeValidate: boolean, data: string) => {
  if (!activeValidate) return true;
  if (!(data.startsWith('0') || data.startsWith('84'))) return "Hãy nhập đúng định dạng điện thoại";
  if (String(data)?.trim()) return true;
  return "Không được để trống";
};
export const isGTE = (
  activeValidate: boolean,
  data: number,
  compareVal: { min: number; max: number }
) => {
  if (!activeValidate) return true;
  if (Number(data) >= compareVal.min) return true;
  if (!compareVal.min) return true;
  return `Phải lớn hơn hoặc bằng ${compareVal.min}`;
};

export const isLTE = (
  activeValidate: boolean,
  data: string,
  compareVal: { min: number; max: number }
) => {
  if (!activeValidate) return true;
  if (Number(data) <= compareVal.max) return true;
  if (!compareVal.max) return true;
  return `Phải nhỏ hơn hoặc bằng ${compareVal.max}`;
};

export const matchConfirmPassword = (
  activeValidate: boolean,
  pwd: string,
  confirmPwd: string
) => {
  if (!activeValidate) return true;
  if (pwd === confirmPwd) return true;
  return "Mật khẩu không khớp";
};

export const isStartDateValid = (activeValidate: boolean, data: string) => {
  if (!activeValidate) return true;
  const ONE_DAY = 24 * 60 * 60 * 1000;

  return (
    ~~(new Date(data).getTime() / ONE_DAY) <
    ~~(new Date().getTime() / ONE_DAY) && "Ngày bắt đầu không phải là quá khứ"
  );
};

export function composeValidator(
  validators: ((activeValidate: boolean, ...data: any) => boolean | string)[],
  activeValidate: boolean,
  ...data: any[]
): { status: "success" | "error"; message: string } {
  for (const validator of validators) {
    const validatorResult = validator(activeValidate, ...data);
    if (typeof validatorResult == "string") {
      return {
        status: "error",
        message: validatorResult,
      };
    }
  }
  return {
    status: "success",
    message: "",
  };
}

export function validateStringLengthChasisNumber(activeValidate: boolean, chassisNumber: string, type = true, isMotor = false) {
  if (!activeValidate) return true;
  if (!!chassisNumber && chassisNumber.length > 0) {
    return !(chassisNumber.length >= (isMotor ? 5 : 8) && chassisNumber.length <= 30) && `Số ${type ? 'khung' : 'máy'} không hợp lệ`;
  } else {
    return `Hãy điền số ${type ? 'khung' : 'máy'}`
  }
}

export function validateStringLengthChasisNumberMotor(activeValidate: boolean, chassisNumber: string, type = true) {
  if (!activeValidate) return true;
  if (!!chassisNumber && chassisNumber.length > 0) {
    return !(chassisNumber.length >= 5 && chassisNumber.length <= 30) && `Số ${type ? 'khung' : 'máy'} không hợp lệ`;
  } else {
    return `Hãy điền số ${type ? 'khung' : 'máy'}`
  }
}
export const validateEmpty = () => {
  return { required: true, message: "Không được để trống" }
};

export const validateEmail = (value) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
    return undefined
  } else {
    return Promise.reject(
      new Error("Email không hợp lệ")
    );
  }
};
export const validateMatch = (value, value1) => {
  if (value === value1) {
    return undefined
  } else {
    return Promise.reject(
      new Error("Mật khẩu không trùng khớp")
    );
  }
};
