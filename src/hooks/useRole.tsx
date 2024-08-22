import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { IUser } from "../services/user";
import { userState } from "../state";

export enum EUserRole {
  AGENCY = "AGENCY",
  SUPER_AGENCY = "SUPER_AGENCY",
  ADMIN = "ADMIN",
  CS = "CS", // customer support
  ACCOUNTANT = "ACCOUNTANT",
}

export function checkRole(userRoles: EUserRole[] = [], role: EUserRole) {
  return userRoles?.includes(role);
}

const useRole = () => {
  const userData = useRecoilValue(userState);

  const checkUserRole = useCallback(
    (user: IUser) => ({
      userIsAdmin: checkRole(user.roles, EUserRole.ADMIN),
      userIsCustomer: !!user,
      userIsAgency: checkRole(user.roles, EUserRole.AGENCY),
      userIsCS: checkRole(user.roles, EUserRole.CS),
      userIsAccountant: checkRole(user.roles, EUserRole.ACCOUNTANT),
    }),
    []
  );

  return {
    isAdmin: checkRole(userData?.roles, EUserRole.ADMIN),
    isCustomer: !!userData,
    isAgency: checkRole(userData?.roles, EUserRole.AGENCY),
    isCS: checkRole(userData?.roles, EUserRole.CS),
    isAccountant: checkRole(userData?.roles, EUserRole.ACCOUNTANT),
    checkUserRole,
    userData,
  };
};

export default useRole;
