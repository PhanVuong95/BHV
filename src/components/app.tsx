import React from "react";
import { Route } from "react-router-dom";
import { App, ZMPRouter, AnimationRoutes, SnackbarProvider } from "zmp-ui";

import { RecoilRoot } from "recoil";
import HomePage from "../pages/home";
import AccountPage from "../pages/account";
import BecomeAgencyPage from "../pages/account/become-agency";
import InstructionManualPage from "../pages/account/instruction-manual";
import InstructionManualGroupPage from "../pages/account/instruction-manual/group";
import InsurancePage from "../pages/insurance";
import WelcomePage from "../pages";
import BuyInsurancePage from "../pages/insurance/buy";
import Initial from "./layouts/Initial";
import CommingSoonFeature from "./common/CommingSoonFeature";
import ChangePasswordPage from "../pages/account/change-password";
import TransactionDetailsPage from "../pages/insurance/transaction/details";
import { ToastProvider } from "react-toast-notifications";
import AgencyPage from "../pages/agency";
import AgencyReportPage from "../pages/agency/report";
import AgencyPaymentPage from "../pages/agency/withdraw";
import AgencySharePage from "../pages/agency/share";
import AgencyVoucherPage from "../pages/agency/voucher";
import LoginPortalPage from "../pages/login/portal";
import SocialInsurance from "../pages/social-insurance";
import Calculations from "../pages/social-insurance/calculations";
import AccountInfomation from "../pages/account/infomations";
import WheelGame from "./views/home/MiniGame";
import TermsAndUse from "../pages/terms-and-use";

const MyApp = () => {
  return (
    <RecoilRoot>
      <style>
        {`     @import
        url('https://fonts.googleapis.com/css2?family=Unbounded:wght@200;300;400;500;600;700;800;900&display=swap');`}
      </style>
      <ToastProvider autoDismissTimeout={2000}>
        <CommingSoonFeature />
        <App>
          <SnackbarProvider>
            <ZMPRouter>
              <Initial />

              <AnimationRoutes>
                <Route path="/" element={<WelcomePage />}></Route>
                <Route path="/home" element={<HomePage />}></Route>
                <Route path="/account" element={<AccountPage />}></Route>
                <Route
                  path="/account/become-agency"
                  element={<BecomeAgencyPage />}
                ></Route>

                <Route
                  path="/home/MiniGame"
                  element={<WheelGame />}
                ></Route>

                <Route
                  path="/account/change-password"
                  element={<ChangePasswordPage />}
                ></Route>
                <Route
                  path="/account/AccountInfomation"
                  element={<AccountInfomation />}
                ></Route>
                <Route
                  path="/terms-and-use"
                  element={<TermsAndUse />}
                ></Route>
                <Route
                  path="/account/transaction/:insuranceId"
                  element={<TransactionDetailsPage />}
                ></Route>
                <Route
                  path="/account/instruction-manual"
                  element={<InstructionManualPage />}
                ></Route>
                <Route
                  path="/account/instruction-manual/:group"
                  element={<InstructionManualGroupPage />}
                ></Route>
                <Route path="/insurance" element={<InsurancePage />}></Route>
                <Route
                  path="/insurance/:feature"
                  element={<BuyInsurancePage />}
                ></Route>
                <Route path="/agency" element={<AgencyPage />}></Route>
                <Route
                  path="/agency/report"
                  element={<AgencyReportPage />}
                ></Route>
                <Route
                  path="/agency/payment"
                  element={<AgencyPaymentPage />}
                ></Route>
                <Route
                  path="/agency/share"
                  element={<AgencySharePage />}
                ></Route>
                <Route
                  path="/agency/voucher"
                  element={<AgencyVoucherPage />}
                ></Route>
                <Route
                  path="/login/portal"
                  element={<LoginPortalPage />}
                ></Route>
                <Route
                  path="/social-insurance"
                  element={<SocialInsurance />}
                ></Route>
                <Route
                  path="/social-insurance/:feature"
                  element={< Calculations />}
                ></Route>

              </AnimationRoutes>
            </ZMPRouter>
          </SnackbarProvider>
        </App>
      </ToastProvider>
    </RecoilRoot>
  );
};
export default MyApp;
