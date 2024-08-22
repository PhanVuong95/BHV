import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Sheet, Text, useNavigate } from "zmp-ui";
import { ECategory, EInsuranceFeature, EInsuranceSource, EInsuranceStatus } from "../../../enums/insurance";
import {
  ICategoryResponse,
  ICreateAutoInsuranceParams,
  ICreateDomesticTravelInsuranceParams,
  ICreateFireInsuranceParams,
  ICreateHomeInsuranceParams,
  ICreateOtherInsuranceParams,
  ICreatePersonalAccidentInsuranceParams,
  ICreateStudentInsuranceParams,
  IInsuranceResponse,
} from "../../../interfaces/insurance";
import { getInsuranceCategory, getMyInsurances } from "../../../services/insurance";
import { insuranceServicesState } from "../../../state";
import Empty from "../../common/Empty";
import FlexBox from "../../common/FlexBox";
import Loading from "../../common/Loading";
import { ChevronRightSvg, IconEmpty } from "../../svgs/ChevronRightSvg";
import { SuppilerLogos } from "../insurance/Suppliers";
import useOA from "../../../hooks/useOA";
import moment from "moment";
import CustomTitle from "../../Title/CustomTitle";
import bg_certificate from "../../../../assets/image/bg_certificate.png"
import bg_certificate_logo_center from "../../../../assets/image/bg_certificate_logo_center.png"
import bg_certificate_logo_right from "../../../../assets/image/bg_certificate_logo_right.png"
import bg_certificate_flower from "../../../../assets/image/bg_certificate_flower.png"
import bg_certificate_logo_left from "../../../../assets/image/bg_certificate_logo_left.png"
import ResponsiveQRCode from "../../common/ResponsiveQRCode";
import QRCode from "react-qr-code";
import { Modal } from "antd";
import { UNIT_VND, formatNumberWithCommas } from "../../Utils";
import { DEFAULT_FORMAT_DATE } from "../insurance/AutoInsurance/AutoInsuranceFormFillDataStep";

const TransactionItem = ({
  insurance,
  status,
  setActionSheetVisible,
  commingSoon,
  pviBizTypeCategory,
  pviFirePackageCategory,
  personalAccidentCategory,
  bicPackageCategory,
  bicPackageCategoryCancer,
  bicTravelCategory,
  pviTravelCategory,
  travelCategory,
  bicHealthPackage,
  micHealthPackage,
  vbiHealPackage

}: {
  bicHealthPackage;
  micHealthPackage;
  vbiHealPackage;
  travelCategory;
  bicTravelCategory;
  pviTravelCategory;
  pviBizTypeCategory;
  bicPackageCategoryCancer;
  bicPackageCategory;
  pviFirePackageCategory;
  personalAccidentCategory;
  commingSoon?: boolean;
  insurance: IInsuranceResponse;
  status: EInsuranceStatus;
  setActionSheetVisible: React.Dispatch<
    React.SetStateAction<IInsuranceResponse>
  >;
}) => {
  const { openChat } = useOA();
  const isTravelCategory = insurance.feature === EInsuranceFeature.TRAVEL_02 ? [...travelCategory] : [...bicTravelCategory, ...pviTravelCategory]
  const insuranceServices = useRecoilValue(insuranceServicesState);
  const findNamePackage = [...pviFirePackageCategory].find((itemFind) => itemFind?.Value == (insurance?.data as any)?.PVI?.package)
  const findNameCategory = [...pviBizTypeCategory].find((itemFind) => itemFind?.Value == (insurance?.data as any)?.PVI?.bizType)
  const findAccidentCategory = [...personalAccidentCategory].find((itemFind) => itemFind?.Value == (insurance?.data as ICreatePersonalAccidentInsuranceParams)?.package)
  const findNameStudentCategory = [...bicPackageCategory].find((itemFind) => itemFind?.Value == (insurance?.data as any)?.BIC?.package)
  const findNameCancerCategory = [...bicPackageCategoryCancer].find((itemFind) => itemFind?.Value == (insurance?.data as any)?.BIC?.package)
  const findNameTravelDomesticCategory = isTravelCategory.find((itemFind) => itemFind?.Value == (insurance?.data?.[insurance?.data?.source])?.package)
  const findNameTravelHealthCategory = [...bicHealthPackage, ...micHealthPackage, ...vbiHealPackage].find((itemFind) => itemFind?.Value == (insurance?.data?.[insurance?.data?.source])?.package)
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false)
  const showModal = (insurance: IInsuranceResponse) => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const feature = insuranceServices.features.find(
    (item) => item.feature === insurance.feature
  );
  const renderNameInsurance = (nameInsurance: string) => {
    let tmp = ''
    if (nameInsurance.toUpperCase() === EInsuranceFeature.MOTOR_01) {
      tmp = 'BẢO HIỂM XE MÁY'
    }
    else if (nameInsurance.toUpperCase() === EInsuranceFeature.AUTO_01) {
      tmp = 'BẢO HIỂM Ô TÔ'
    }
    else if (nameInsurance.toUpperCase() === EInsuranceFeature.PERSONAL_01) {
      tmp = 'BẢO HIỂM TAI NẠN CÁ NHÂN'
    }
    else if (nameInsurance.toUpperCase() === EInsuranceFeature.PERSONAL_02) {
      tmp = 'BẢO HIỂM TAI NẠN MỞ RỘNG'
    }
    else if (nameInsurance.toUpperCase() === EInsuranceFeature.TRAVEL_01) {
      tmp = 'BẢO HIỂM DU LỊCH TRONG NƯỚC'
    }
    else if (nameInsurance.toUpperCase() === EInsuranceFeature.TRAVEL_02) {
      tmp = 'BẢO HIỂM DU LỊCH QUỐC TẾ'
    }
    else if (nameInsurance.toUpperCase() === EInsuranceFeature.HEALTH_01) {
      tmp = 'BẢO HIỂM SỨC KHỎE'
    }
    else if (nameInsurance.toUpperCase() === EInsuranceFeature.HEALTH_02) {
      tmp = 'BẢO HIỂM UNG THƯ'
    }
    else if (nameInsurance.toUpperCase() === EInsuranceFeature.FIRE_01) {
      tmp = 'BẢO HIỂM CHÁY NỔ'
    }
    else if (nameInsurance.toUpperCase() === EInsuranceFeature.HOME_01) {
      tmp = 'BẢO HIỂM NHÀ TƯ NHÂN'
    }
    else if (nameInsurance.toUpperCase() === EInsuranceFeature.STUDENT_01) {
      tmp = 'BẢO HIỂM HỌC SINH SINH VIÊN'
    }
    return tmp.toLowerCase().replace('b', 'B')
  }

  const expiry =
    insurance.feature === EInsuranceFeature.HOME_01
      ? `${(insurance.data as ICreateHomeInsuranceParams).expiry} tháng`
      : [EInsuranceFeature.TRAVEL_01, EInsuranceFeature.TRAVEL_02].includes(
        insurance.feature
      )
        ? `${(insurance.data as ICreateDomesticTravelInsuranceParams).duration
        } ngày`
        : `${(insurance.data as ICreateAutoInsuranceParams).expiry || 1} năm`;

  const options = [
    {
      Text: 'Xem hình ảnh minh họa',
      Value: 1
    },
    {
      Text: 'Xem GCN gốc',
      Value: `/account/transaction/${insurance.id}`
    },
  ]
  return (
    <>
      <Modal
        closable={false}
        title={<div className='text-primary-color' style={{ textAlign: 'center', fontSize: '16px', fontWeight: 500 }}>Xem GCN bảo hiểm</div>}
        className="custom-modal-antd-bottom"
        open={openModal}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
        footer={null}
        style={{
          bottom: 0,
          top: 'auto',
          position: 'fixed',
          left: 0,
          right: 0,
          width: '100%',
        }}
      >
        {
          options?.map((itemMap, key, arr) => <>
            <div
              onClick={() => {
                if (itemMap.Value === 1) {
                  showModal(insurance)
                } else {
                  navigate(`/account/transaction/${insurance.id}`)
                }
                // setOpenModal(false)
              }}
              style={{ padding: '16px 0px', position: 'relative' }} className='custom-select-v2-item'>
              {itemMap?.Text}
            </div>
            {
              arr.length - 1 === key ? '' : <hr />
            }
          </>)
        }
      </Modal>
      <Modal
        centered
        open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
        className="custom-modal certificate"
        footer={null}
        closeIcon={false}
      >
        <div style={{ position: 'relative', padding: '0px 12px' }}>
          <div style={{
            backgroundImage: `url(${bg_certificate})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            padding: '0px 12px 12px 12px',
            position: 'relative'
          }}>
            {/* <div style={{ position: 'absolute', bottom: '0px', left: '0px' }}>
              <img style={{ maxWidth: '136px' }} src={bg_certificate_flower} alt="bg_certificate_flower" />
            </div> */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {/* <div className="flex-1">
                <img style={{ width: '116px', marginTop: '12px' }} src={bg_certificate_logo_left} />
              </div> */}
              {/* <img style={{ width: '12px', position: 'absolute', top: '0px', right: '12px', bottom: '0px', height: '100%' }} src={bg_certificate_logo_right} /> */}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '24px' }}>
              <img style={{ width: '178px' }} src={bg_certificate_logo_center} className="bg_certificate_logo_center" />
            </div>
            <div
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <div style={{ color: 'white' }} className="wrap-transaction-list-certificatea">
                {
                  (insurance?.feature === EInsuranceFeature.AUTO_01 || insurance?.feature === EInsuranceFeature.MOTOR_01) && <>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Chủ xe</span><span style={{ margin: '0px 24px' }}>:</span> {(insurance.data as ICreateAutoInsuranceParams).userName}</p>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Số CMND/CCCD</span><span style={{ margin: '0px 24px' }}>:</span> {insurance?.data?.identityCardNum}</p>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Loại bảo hiểm</span><span style={{ margin: '0px 24px' }}>:</span> <span>{renderNameInsurance(insurance?.feature)}</span></p>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Nhà cung cấp</span><span style={{ margin: '0px 24px' }}>:</span> {insurance?.data?.source}</p>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Biển số xe</span><span style={{ margin: '0px 24px' }}>:</span> {(insurance.data as ICreateAutoInsuranceParams).licensePlates}</p>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Loại xe</span><span style={{ margin: '0px 24px' }}>:</span> {(insurance.data as ICreateAutoInsuranceParams)?.category}</p>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Thời hạn bảo hiểm</span><span style={{ margin: '0px 24px' }}>:</span> {(insurance.data as ICreateAutoInsuranceParams)?.expiry} năm</p>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Số tiền tham gia bảo hiểm</span><span style={{ margin: '0px 24px' }}>:</span> {formatNumberWithCommas(insurance?.fee)} {UNIT_VND}</p>
                  </>
                }
                {
                  (insurance?.feature === EInsuranceFeature.TRAVEL_01 || insurance?.feature === EInsuranceFeature.TRAVEL_02) && <>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Nguời mua bảo hiểm</span><span style={{ margin: '0px 24px' }}>:</span> {(insurance.data as ICreateAutoInsuranceParams).userName}</p>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Số CMND/CCCD</span><span style={{ margin: '0px 24px' }}>:</span> {insurance?.data?.identityCardNum}</p>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Loại bảo hiểm</span><span style={{ margin: '0px 24px' }}>:</span> <span>{renderNameInsurance(insurance?.feature)}</span></p>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Nhà cung cấp</span><span style={{ margin: '0px 24px' }}>:</span> {insurance?.data?.source}</p>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Gói bảo hiểm</span><span style={{ margin: '0px 24px' }}>:</span> {findNameTravelDomesticCategory?.Text}</p>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Phạm vi du lịch</span><span style={{ margin: '0px 24px' }}>:</span> {(insurance.data as ICreateDomesticTravelInsuranceParams)?.trip}</p>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Số người tham gia bảo hiểm</span><span style={{ margin: '0px 24px' }}>:</span> {(insurance.data as ICreateDomesticTravelInsuranceParams)?.personNum}</p>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Số ngày du lịch</span><span style={{ margin: '0px 24px' }}>:</span> {(insurance.data as ICreateDomesticTravelInsuranceParams)?.duration}</p>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Thời gian du lịch</span><span style={{ margin: '0px 24px' }}>:</span> {moment((insurance.data as ICreateDomesticTravelInsuranceParams)?.startDate).format(DEFAULT_FORMAT_DATE)}</p>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Số tiền tham gia bảo hiểm</span><span style={{ margin: '0px 24px' }}>:</span> {formatNumberWithCommas(insurance?.fee)} {UNIT_VND}</p>
                  </>
                }
                {
                  (insurance?.feature === EInsuranceFeature.FIRE_01) && <>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Nguời mua bảo hiểm</span><span style={{ margin: '0px 24px' }}>:</span> {(insurance.data as ICreateAutoInsuranceParams).userName}</p>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Số CMND/CCCD</span><span style={{ margin: '0px 24px' }}>:</span> {insurance?.data?.identityCardNum}</p>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Loại bảo hiểm</span><span style={{ margin: '0px 24px' }}>:</span> <span>{renderNameInsurance(insurance?.feature)}</span></p>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Gói bảo hiểm</span><span style={{ margin: '0px 24px' }}>:</span> {findNamePackage?.Text}</p>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Loại hình kinh doanh</span><span style={{ margin: '0px 24px' }}>:</span> {findNameCategory?.Text}</p>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Thời gian du lịch</span><span style={{ margin: '0px 24px' }}>:</span> {moment((insurance.data as ICreateDomesticTravelInsuranceParams)?.startDate).format(DEFAULT_FORMAT_DATE)}</p>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Số tiền tham gia bảo hiểm</span><span style={{ margin: '0px 24px' }}>:</span> {formatNumberWithCommas(insurance?.fee)} {UNIT_VND}</p>
                  </>
                }
                {
                  (insurance?.feature === EInsuranceFeature.PERSONAL_01 || insurance?.feature === EInsuranceFeature.PERSONAL_02) && <>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Nguời mua bảo hiểm</span><span style={{ margin: '0px 24px' }}>:</span> {(insurance.data)?.userName}</p>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Số CMND/CCCD</span><span style={{ margin: '0px 24px' }}>:</span> {insurance?.data?.identityCardNum}</p>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Loại bảo hiểm</span><span style={{ margin: '0px 24px' }}>:</span> <span>{renderNameInsurance(insurance?.feature)}</span></p>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Gói bảo hiểm</span><span style={{ margin: '0px 24px' }}>:</span> {findAccidentCategory?.Text}</p>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Số người tham gia bảo hiểm</span><span style={{ margin: '0px 24px' }}>:</span> {(insurance.data as ICreatePersonalAccidentInsuranceParams)?.personNum}</p>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Thời gian bảo hiểm</span><span style={{ margin: '0px 24px' }}>:</span> {moment((insurance.data as ICreatePersonalAccidentInsuranceParams)?.startDate).format(DEFAULT_FORMAT_DATE)}</p>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Số tiền tham gia bảo hiểm</span><span style={{ margin: '0px 24px' }}>:</span> {formatNumberWithCommas(insurance?.fee)} {UNIT_VND}</p>
                  </>
                }
                {
                  (insurance?.feature === EInsuranceFeature.STUDENT_01) && <>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Nguời mua bảo hiểm</span><span style={{ margin: '0px 24px' }}>:</span> {(insurance.data)?.userName}</p>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Số CMND/CCCD</span><span style={{ margin: '0px 24px' }}>:</span> {insurance?.data?.identityCardNum}</p>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Loại bảo hiểm</span><span style={{ margin: '0px 24px' }}>:</span> <span>{renderNameInsurance(insurance?.feature)}</span></p>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Gói bảo hiểm</span><span style={{ margin: '0px 24px' }}>:</span> {findNameStudentCategory?.Text}</p>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Số người tham gia bảo hiểm</span><span style={{ margin: '0px 24px' }}>:</span> {(insurance.data as ICreatePersonalAccidentInsuranceParams)?.personNum}</p>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Thời gian bảo hiểm</span><span style={{ margin: '0px 24px' }}>:</span> {moment((insurance.data as ICreatePersonalAccidentInsuranceParams)?.startDate).format(DEFAULT_FORMAT_DATE)}</p>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Số tiền tham gia bảo hiểm</span><span style={{ margin: '0px 24px' }}>:</span> {formatNumberWithCommas(insurance?.fee)} {UNIT_VND}</p>
                  </>
                }
                {
                  (insurance?.feature === EInsuranceFeature.HEALTH_02) && <>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Nguời mua bảo hiểm</span><span style={{ margin: '0px 24px' }}>:</span> {(insurance.data)?.userName}</p>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Số CMND/CCCD</span><span style={{ margin: '0px 24px' }}>:</span> {insurance?.data?.identityCardNum}</p>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Loại bảo hiểm</span><span style={{ margin: '0px 24px' }}>:</span> <span>{renderNameInsurance(insurance?.feature)}</span></p>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Gói bảo hiểm</span><span style={{ margin: '0px 24px' }}>:</span> {findNameCancerCategory?.Text}</p>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Số người tham gia bảo hiểm</span><span style={{ margin: '0px 24px' }}>:</span> {(insurance.data as ICreatePersonalAccidentInsuranceParams)?.personNum}</p>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Thời gian bảo hiểm</span><span style={{ margin: '0px 24px' }}>:</span> {moment((insurance.data as ICreatePersonalAccidentInsuranceParams)?.startDate).format(DEFAULT_FORMAT_DATE)}</p>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Số tiền tham gia bảo hiểm</span><span style={{ margin: '0px 24px' }}>:</span> {formatNumberWithCommas(insurance?.fee)} {UNIT_VND}</p>
                  </>
                }
                {
                  (insurance?.feature === EInsuranceFeature.HEALTH_01) && <>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Nguời mua bảo hiểm</span><span style={{ margin: '0px 24px' }}>:</span> {(insurance.data)?.userName}</p>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Số CMND/CCCD</span><span style={{ margin: '0px 24px' }}>:</span> {insurance?.data?.identityCardNum}</p>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Loại bảo hiểm</span><span style={{ margin: '0px 24px' }}>:</span> <span>{renderNameInsurance(insurance?.feature)}</span></p>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Gói bảo hiểm</span><span style={{ margin: '0px 24px' }}>:</span> {findNameTravelHealthCategory?.Text}</p>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Số người tham gia bảo hiểm</span><span style={{ margin: '0px 24px' }}>:</span> {(insurance.data as ICreatePersonalAccidentInsuranceParams)?.personNum}</p>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Thời gian bảo hiểm</span><span style={{ margin: '0px 24px' }}>:</span> {moment((insurance.data as ICreatePersonalAccidentInsuranceParams)?.startDate).format(DEFAULT_FORMAT_DATE)}</p>
                    <p style={{ fontSize: '10px', margin: '12px 0px' }}><span style={{ minWidth: '132px', display: 'inline-block' }}>Số tiền tham gia bảo hiểm</span><span style={{ margin: '0px 24px' }}>:</span> {formatNumberWithCommas(insurance?.fee)} {UNIT_VND}</p>
                  </>
                }
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <FlexBox
        className="flex justify-between items-center m-4 p-2 bg-white box-shadow"
        style={{ borderRadius: "12px" }}
      >
        <div className=" max-w-[100%]" style={{ width: "100%" }}>
          <Text className="font-medium text-base mb-1 p-1 leading-5 flex justify-between items-center pb-3" style={{ borderBottom: "1px solid #F0F0F0" }}>
            <CustomTitle title={feature?.title} />
            {/* Nhà cung cấp:{" "} */}
            {
              SuppilerLogos({
                width: 40,
                height: 40,
                style: { margin: "0 6px" },
              })[insurance.source]
            }{" "}
          </Text>
          <div className="content-contract">
            <FlexBox className="rounded-2xl mr-2 p-1 text-ct mt-1">
              <label className="flex-1">Nhà cung cấp:{" "}</label>
              {insurance.feature == EInsuranceFeature.OTHER_01 ? (insurance.data as ICreateOtherInsuranceParams).featureSource : insurance.source}
            </FlexBox>

            {insurance?.data?.userName && (
              <FlexBox className="rounded-2xl mr-2 p-1 text-ct mt-1">
                <label className="flex-1">{insurance?.feature == EInsuranceFeature.OTHER_01 ? "Tên khách hàng" : "Tên người mua"}:</label> {insurance.data.userName}
              </FlexBox>
            )}
            {insurance?.data?.phone && insurance?.feature == EInsuranceFeature.OTHER_01 && (
              <FlexBox className="rounded-2xl mr-2 p-1 text-ct mt-1">
                <label className="flex-1">Số điện thoại:</label> {insurance?.data?.phone}
              </FlexBox>
            )}
            {insurance?.data?.startDate && insurance?.feature == EInsuranceFeature.OTHER_01 && (
              <FlexBox className="rounded-2xl mr-2 p-1 text-ct mt-1">
                <label className="flex-1">Ngày thực hiện:</label> {moment(insurance?.data?.startDate).format("DD/MM/YYYY HH:mm:ss")}
              </FlexBox>
            )}
            {(insurance?.data as ICreatePersonalAccidentInsuranceParams)
              .beneficiaryName && (
                <FlexBox className="rounded-2xl mr-2 p-1 text-ct mt-1">
                  <label className="flex-1">Tên người thụ hưởng:{" "}</label>
                  {
                    (insurance?.data as ICreatePersonalAccidentInsuranceParams)
                      .beneficiaryName
                  }
                </FlexBox>
              )}
            {(insurance?.data as ICreateAutoInsuranceParams).licensePlates && (
              <FlexBox className="rounded-2xl mr-2 p-1 text-ct mt-1">
                <label className="flex-1">Biển số xe:{" "}</label>
                {(insurance.data as ICreateAutoInsuranceParams).licensePlates}
              </FlexBox>
            )}
            {status === EInsuranceStatus.PURCHASED && (
              <FlexBox className="rounded-2xl mr-2 p-1 text-ct mt-1">
                <label className="flex-1">Thời hạn:</label> {expiry}
              </FlexBox>
            )}

            {insurance?.createBody &&
              !insurance?.callbackResponse &&
              insurance?.createResponse.success && (
                <FlexBox className="rounded-2xl p-1 text-ct mt-1">
                  Đang xử lý
                </FlexBox>
              )}
            {insurance?.createBody && !insurance?.createResponse?.success && (
              <FlexBox className="rounded-2xl p-1 text-ct mt-1">
                Có lỗi xảy ra
              </FlexBox>
            )}
          </div>
          <div className="full-btn" style={{ justifyContent: insurance?.feature == EInsuranceFeature.OTHER_01 ? 'center' : 'end' }}>
            {
              insurance?.feature == EInsuranceFeature.OTHER_01 &&
              <div className="btn-indemnify" onClick={() => openChat("Tôi cần liên hệ với bác sỹ tư vấn")}
              >Liên hệ Bác sỹ tư vấn <ChevronRightSvg /></div>
            }
            {/* {
            insurance?.feature !== EInsuranceFeature.OTHER_01 &&
            <div
            // onClick={()=>alert('1')}
            className="btn-indemnify"
              style={{ color: 'var(--primary-color)' }}
            >Bồi thường <ChevronRightSvg /></div>
          } */}

            <div className="btn-info"
              style={{ background: 'var(--primary-color)' }}
              onClick={() => {
                switch (status) {
                  case EInsuranceStatus.CART:
                    return setActionSheetVisible(insurance);
                  case EInsuranceStatus.PURCHASED:
                    return setOpenModal(true)
                  case EInsuranceStatus.OTHER:
                    return navigate(`/account/transaction/${insurance.id}`);

                }
              }}
            >Xem chi tiết <ChevronRightSvg /></div>
          </div>
        </div>
        {/* {(status === EInsuranceStatus.CART && <Icon icon="zi-more-vert" />) || (
        <ChevronRightSvg />
      )} */}
      </FlexBox>
    </>

  );
};

type Props = {
  status: EInsuranceStatus;
};

const TransactionList = ({ status }: Props) => {

  const navigator = useNavigate();
  const [loading, setloading] = useState(false);
  const [filter, setfilter] = useState<{
    page: number;
    limit: number;
  }>({
    page: 1,
    limit: 1000,
  });
  const [actionSheetVisible, setActionSheetVisible] = useState<
    IInsuranceResponse | undefined
  >();

  const setInsuranceServiceState = useSetRecoilState(insuranceServicesState);
  const [insurances, setinsurances] = useState<IInsuranceResponse[]>([]);
  const [pviFirePackageCategory, setPviFirePackageCategory] = useState<
    ICategoryResponse[]
  >([]);
  const [personalAccidentCategory, setPersonalAccidentCategory] = useState<
    ICategoryResponse[]
  >([]);

  const [pviBizTypeCategory, setPviBizTypeCategory] = useState<
    ICategoryResponse[]
  >([]);
  const [bicPackageCategory, setbicPackageCategory] = useState<
    ICategoryResponse[]
  >([]);

  const [pviTravelCategory, setpviTravelCategory] = useState<
    ICategoryResponse[]
  >([]);
  const [bicTravelCategory, setbicTravelCategory] = useState<
    ICategoryResponse[]
  >([]);

  const [bicPackageCategoryCancer, setbicPackageCategoryCancer] = useState<
    ICategoryResponse[]
  >([]);
  const [travelCategory, setTravelCategory] = useState<
    ICategoryResponse[]
  >([]);
  const [bicHealthPackage, setbicHealthPackageCategory] = useState<
    ICategoryResponse[]
  >([]);
  const [micHealthPackage, setmicHealthPackageCategory] = useState<
    ICategoryResponse[]
  >([]);
  const [vbiHealPackage, setvbiHealthPackageCategory] = useState<
    ICategoryResponse[]
  >([]);

  useEffect(() => {
    getInsuranceCategory(ECategory.HEALTH_PACKAGES, {
      source: EInsuranceSource.BIC,
    }).then((res) => setbicHealthPackageCategory(res));
    getInsuranceCategory(ECategory.HEALTH_PACKAGES, {
      source: EInsuranceSource.MIC,
    }).then((res) => setmicHealthPackageCategory(res));
    getInsuranceCategory(ECategory.HEALTH_PACKAGES, {
      source: EInsuranceSource.VBI,
    }).then((res) => setvbiHealthPackageCategory(res));
  }, []);

  useEffect(() => {
    getInsuranceCategory(ECategory.FIRE_PACKAGES, {
      source: EInsuranceSource.PVI,
    }).then((res) => setPviFirePackageCategory(res));
    getInsuranceCategory(ECategory.BIZ_TYPES, {
      source: EInsuranceSource.PVI,
    }).then((res) => setPviBizTypeCategory(res));

    getInsuranceCategory(ECategory.PERSONAL_ACCIDENT_PACKAGE).then((res) =>
      setPersonalAccidentCategory(res)
    );

  }, []);


  useEffect(() => {
    getInsuranceCategory(ECategory.DOMESTIC_TRAVEL_PACKAGE, {
      source: EInsuranceSource.PVI,
    }).then((res) => setpviTravelCategory(res));
    getInsuranceCategory(ECategory.DOMESTIC_TRAVEL_PACKAGE, {
      source: EInsuranceSource.BIC,
    }).then((res) => setbicTravelCategory(res));
  }, []);


  useEffect(() => {
    getInsuranceCategory(ECategory.OVERSEA_TRAVEL_PACKAGE, {
      source: EInsuranceSource.BIC,
    }).then((res) => setTravelCategory(res));
  }, []);


  useEffect(() => {
    getInsuranceCategory(ECategory.CANCER_PACKAGES, {
      source: EInsuranceSource.BIC,
    }).then((res) => setbicPackageCategoryCancer(res));
  }, []);
  useEffect(() => {
    getInsuranceCategory(ECategory.STUDENT_PACKAGES, {
      source: EInsuranceSource.BIC,
    }).then((res) => {
      setbicPackageCategory(res);
    });
  }, []);
  useEffect(() => {
    setloading(true);
    getMyInsurances({ status, ...filter })
      .then((res) => setinsurances(res.docs))
      .finally(() => setloading(false));
  }, [filter, status]);

  if (loading) return <Loading />;
  if (!insurances.length && !loading)
    return (
      <>
        {<IconEmpty />}
        <div style={{ textAlign: 'center', fontSize: '14px', fontWeight: 500, color: '#2E2E2E' }}>
          Không tìm thấy hợp đồng
        </div>
      </>
      // <Empty className="mt-10" description="Không có hợp đồng" />
    );
  return (
    <div>
      {insurances.map((insurance) => (
        <TransactionItem
          bicHealthPackage={bicHealthPackage}
          micHealthPackage={micHealthPackage}
          vbiHealPackage={vbiHealPackage}
          travelCategory={travelCategory}
          pviTravelCategory={pviTravelCategory}
          bicTravelCategory={bicTravelCategory}
          bicPackageCategoryCancer={bicPackageCategoryCancer}
          bicPackageCategory={bicPackageCategory}
          personalAccidentCategory={personalAccidentCategory}
          pviFirePackageCategory={pviFirePackageCategory}
          pviBizTypeCategory={pviBizTypeCategory}
          key={insurance.id}
          insurance={insurance}
          status={status}
          setActionSheetVisible={setActionSheetVisible}
        />
      ))}
      <Sheet.Actions
        visible={!!actionSheetVisible}
        title="Hành động"
        onClose={() => setActionSheetVisible(undefined)}
        actions={[
          [
            {
              text: "Chỉnh sửa và thanh toán",
              onClick: () => {
                setInsuranceServiceState((data) => ({
                  ...data,
                  insuranceEditting: actionSheetVisible,
                }));
                navigator(`/insurance/${actionSheetVisible?.feature}`);
              },
            },
            {
              text: "Xác nhận và thanh toán",
              onClick: () => {
                navigator(`/account/transaction/${actionSheetVisible?.id}`);
              },
            },
            // {
            //   text: "Xoá",
            //   onClick: () => {
            //     navigator(`/account/transaction/${actionSheetVisible}`);

            //     setActionSheetVisible(undefined);
            //   },
            //   className: "text-red-700",
            // },
          ],
          [
            {
              text: "Đóng",
              close: true,
            },
          ],
        ]}
        style={{
          paddingBottom: 100,
        }}
      />
    </div>
  );
};

export default TransactionList;
