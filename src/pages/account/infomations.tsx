import React, { useEffect, useRef, useState } from "react";
import { Box } from "zmp-ui";
import FlexBox from "../../components/common/FlexBox";
import withLogin from "../../hooks/withLogin";
import { IUserDetails, changeUserinfo, getUserinfo } from "../../services/user";
import { useToasts } from "react-toast-notifications";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Row,
  Spin,
  Typography,
} from "antd";
import UploadImage from "../../components/common/Gallery/UploadImage";
import dayjs from "dayjs";
import LayoutHeaderV2 from "../../components/layouts/LayoutHeaderV2";
import FloatLabel from "../../components/FloatLabel";
import { validateEmpty } from "../../helpers/validator";
import CustomSelectV2 from "../../components/select/CustomSelectV2";
import { OptionGender } from "../../enums";
import CustomDatePicker from "../../components/common/DatePicker/CustomDatePicker";
import CustomUploadV2 from "../../components/common/Upload/CustomUploadV2";
import CustomFooter from "../../components/Footer/CustomFooter";
import CustomTitle from "../../components/Title/CustomTitle";
function genDefaultImageList(imageUrls: string[]) {
  return (imageUrls || []).map((imageUrl, index) => ({
    uid: String(index),
    name: imageUrl,
    status: "done" as any,
    url: imageUrl,
    response: imageUrl,
    className: 'custom-image-antd'
  }));
}
export const changeUserinfoForm = () => {
  const [form] = Form.useForm();
  const fullName = Form.useWatch('fullName', form);
  const phone = Form.useWatch('phone', form);
  const address = Form.useWatch('address', form);
  const IDCardNum = Form.useWatch('IDCardNum', form);
  const issuedBy = Form.useWatch('issuedBy', form);
  const bankAccNum = Form.useWatch('bankAccNum', form);
  const bankAccName = Form.useWatch('bankAccName', form);
  const bankName = Form.useWatch('bankName', form);
  const taxCode = Form.useWatch('taxCode', form);
  const gender = Form.useWatch('gender', form);
  const birthday = Form.useWatch('birthday', form);
  const dateOfIssue = Form.useWatch('dateOfIssue', form);
  const dueDate = Form.useWatch('dueDate', form);
  const IDCardImages = Form.useWatch('IDCardImages', form);
  const cardImages = Form.useWatch('cardImages', form);
  const signImage = Form.useWatch('signImage', form);


  const [data, setData] = useState<IUserDetails>({} as IUserDetails);
  const [loadedData, setloadedData] = useState<boolean>(false);
  const { addToast } = useToasts();

  useEffect(() => {
    const getUserDetail = async () => {
      const res = await getUserinfo();
      if (!!res && Object.keys(res).length > 0) {
        setData(res);
        form.setFieldsValue({
          ...res,
          // birthday: moment(data.birthday),
          birthday: dayjs(data.birthday),
          dateOfIssue: dayjs(data.dateOfIssue),
          dueDate: dayjs(data.dueDate),
          IDCardImages: { fileList: genDefaultImageList(data.IDCardImages) },
          cardImages: { fileList: genDefaultImageList(data.cardImages) },
          signImage: { fileList: genDefaultImageList([data.signImage]) },
        });
      } else {
        form.setFieldsValue({
          birthday: dayjs(),
          dateOfIssue: dayjs(),
          dueDate: dayjs(),
        });
      }
      setloadedData(true);
    }
    getUserDetail()
  }, [loadedData]);

  const onFinish = () => {
    const formData = form.getFieldsValue();
    const newData: IUserDetails = {
      ...formData,
      birthday: formData.birthday.toISOString(),
      dateOfIssue: formData.dateOfIssue.toISOString(),
      dueDate: formData.dueDate.toISOString(),
      IDCardImages: formData.IDCardImages.fileList.map(
        (item: any) => item.response
      ),
      cardImages: formData.cardImages.fileList.map(
        (item: any) => item.response
      ),
      signImage: formData.signImage.fileList[0]?.response,
      contractSented: false,
      isVertified: false,
      gender: gender
    };
    changeUserinfo(newData).then(() => {
      console.log("sucess");
      try {
        if ("sucess") {
          addToast("Đã lưu", {
            appearance: "success",
            autoDismiss: true,
          });
          return;
        }
      } catch (onFinishFailed) {
        console.error(onFinishFailed);
        addToast("Có lỗi xảy ra", {
          appearance: "error",
          autoDismiss: true,
        });
      }

    });
  };

  const onChangeFileList = (fileList: any) => {
    console.log(fileList);
  };
  const handleGoBack = () => {
    window.history.back();
  };
  if (!loadedData || !data) return <Spin size="large" />;


  return (
    <Form
      form={form}
      name="basic"
      className="custom-infomation"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      style={{ width: "100%" }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <LayoutHeaderV2 title={'Thông tin tài khoản'} showBackIcon />
      <Box
        style={{
          background: "white",
          // borderTop: "3px solid gray",
          padding: "12px 0 0",
        }}
      >
        <div className="mb-2" style={{ marginTop: '50px', paddingLeft: '12px' }}>
          <CustomTitle title='Thông tin chung' />
        </div>
        <Row gutter={24} style={{ padding: '0px 12px' }}>
          <Col span={24} md={8}>
            <FloatLabel
              form={form}
              rules={[validateEmpty()]} label="Họ và tên" name="fullName" value={fullName} />
          </Col>
          <Col span={24} md={8}>
            <CustomDatePicker
              name='birthday'
              value={birthday || ''}
              form={form}
              onChange={(e) => {
              }}
              disabledDate={(date) => {
                return date.valueOf() > Date.now();
              }}
              rules={[validateEmpty()]}
              label='Ngày sinh' />

          </Col>
          <Col span={24} md={8}>
            <CustomSelectV2
              name='gender'
              options={OptionGender}
              value={gender || ''}
              form={form}
              onChange={(e) => {
              }}
              rules={[validateEmpty()]}
              label='Giới tính' />
          </Col>
          <Col span={24} md={8}>
            <FloatLabel
              form={form}

              rules={[
                validateEmpty(),
                {
                  validator: async function (_rule, value) {
                    if (
                      value?.replace(/[^\d]/g, "")?.length !== value?.length
                    ) {
                      return Promise.reject(
                        new Error("Số điện thoại không hợp lệ")
                      );
                    }
                  },
                },
              ]}
              label="Số điện thoại" name="phone" value={phone} />
          </Col>
          <Col span={24} md={8}>
            <FloatLabel
              form={form}
              rules={[validateEmpty()]} label="Địa chỉ" name="address" value={address} />
          </Col>
          <Col span={24} md={8}>
            <FloatLabel
              form={form}

              rules={[
                validateEmpty(),
                {
                  validator: async function (_rule, value) {
                    console.log(value);
                    if (
                      ![9, 12].includes(
                        value?.replace(/[^\d]/g, "")?.length || 0
                      )
                    ) {
                      return Promise.reject(
                        new Error("Số CMT/CCCD không hợp lệ")
                      );
                    }
                  },
                },
              ]}
              label="Số CMT/CCCD" name="IDCardNum" value={IDCardNum} />
          </Col>
          <Col span={24} md={8}>
            <CustomDatePicker
              name='dateOfIssue'
              value={dateOfIssue || ''}
              form={form}
              onChange={(e) => {
              }}
              disabledDate={(date) => {
                return date.valueOf() > Date.now();
              }}
              rules={[validateEmpty()]}
              label='Ngày cấp CMND/CCCD' />
          </Col>
          <Col span={24} md={8}>
            <FloatLabel
              form={form}

              rules={[validateEmpty()]}
              label="Nơi cấp CMND/CCCD"
              name="issuedBy" value={issuedBy}
            />
          </Col>
          <Col span={24} md={8}>
            <CustomDatePicker
              name='dueDate'
              value={dueDate || ''}
              form={form}
              onChange={(e) => {
              }}
              rules={[validateEmpty()]}
              label="Có giá trị đến"
            />
          </Col>
        </Row>
      </Box>
      <Box
        style={{
          background: "white",
          padding: "12px 0",
          // borderTop: "3px solid gray",
        }}
      >
        <div className="mb-2" style={{ paddingLeft: '12px' }}>
          <CustomTitle title='Thông tin thanh toán' />
        </div>
        <Row gutter={24} style={{ padding: '0px 12px 12px 12px' }}>
          <Col span={24} md={8}>
            <FloatLabel
              form={form}

              rules={[
                validateEmpty(),
                {
                  validator: async function (_rule, value) {
                    if (
                      value?.replace(/[^\d]/g, "")?.length !== value?.length
                    ) {
                      return Promise.reject(
                        new Error("Số tài khoản không hợp lệ")
                      );
                    }
                  },
                },
              ]}
              label="Số tài khoản"
              name="bankAccNum" value={bankAccNum}
            />
          </Col>
          <Col span={24} md={8}>
            <FloatLabel
              form={form}

              rules={[validateEmpty()]}
              label="Chủ tài khoản"
              name="bankAccName" value={bankAccName}
            />
          </Col>
          <Col span={24} md={8}>
            <FloatLabel
              form={form}

              rules={[validateEmpty()]}
              label="Ngân hàng"
              name="bankName" value={bankName}
            />
          </Col>
          <Col span={24} md={8}>
            <FloatLabel
              form={form}
              rules={[
                {
                  validator: async function (_rule, value) {
                    if (
                      value &&
                      value?.replace(/[^\d]/g, "")?.length !== value.length
                    ) {
                      return Promise.reject(
                        new Error("Mã số thuế không hợp lệ")
                      );
                    }
                  },
                },
              ]}
              label="Mã số thuế"
              name="taxCode" value={taxCode}
            />
          </Col>
        </Row>
      </Box>
      <div className="mb-2" style={{ paddingLeft: '12px' }}>
        <CustomTitle title='Upload file' />
      </div>
      <Box
        style={{
          background: "white",
          // borderTop: "3px solid gray",
          padding: "12px ",
          marginBottom: "60px",
        }}
      >
        <CustomUploadV2
          label='Ảnh CMT/CCCD 2 mặt'
          value={IDCardImages}
          name={'IDCardImages'}
          form={form}
          rules={[
            validateEmpty(),
            {
              validator: async function (_rule, value) {
                if (value?.fileList?.length < 2) {
                  return Promise.reject(new Error("Phải có ít nhất 2 ảnh"));
                }
              },
            },
          ]}
        />
        <CustomUploadV2
          label="Ảnh thẻ 3x4"
          value={cardImages}
          name={'cardImages'}
          form={form}
          rules={[
            validateEmpty(),
          ]}
        />
        <CustomUploadV2
          multilple={false}
          label="Chữ ký"
          value={signImage}
          name={'signImage'}
          form={form}
          rules={[
            validateEmpty(),
          ]}
        />
      </Box>
      <CustomFooter />
    </Form>
  );
};

export default withLogin(changeUserinfoForm);
