import React from 'react';
import { Form } from 'antd';
import UploadImage from '../Gallery/UploadImage';
import icon_add_image from "../../../../assets/image/icon_add_image.png"
const CustomUploadV2 = (props) => {
    const { value, name, rules = [], form, label, multilple } = props;
    const handleInsertImage = () => {
        const getId = document.getElementById(`upload-image-id-tmp-${name}`)
        if (getId) {
            getId.click()
        }
    }
    const onChangeFileList = (fileList: any) => {
        if (fileList?.[fileList?.length - 1]?.status !== 'uploading') {
            if (multilple === false) {
                form.setFieldValue(name, {
                    fileList: [
                        {
                            "uid": fileList?.[fileList?.length - 1]?.uid,
                            "name": fileList?.[fileList?.length - 1]?.response,
                            "status": "done",
                            "url": fileList?.[fileList?.length - 1]?.response,
                            "response": fileList?.[fileList?.length - 1]?.response,
                            "className": "custom-image-antd"
                        },
                    ]
                })
            }
            else {
                form.setFieldValue(name, {
                    fileList: [
                        {
                            "uid": fileList?.[fileList?.length - 1]?.uid,
                            "name": fileList?.[fileList?.length - 1]?.response,
                            "status": "done",
                            "url": fileList?.[fileList?.length - 1]?.response,
                            "response": fileList?.[fileList?.length - 1]?.response,
                            "className": "custom-image-antd"
                        },
                        ...value?.fileList,
                    ]
                })
            }
        }
    };
    return <Form.Item
        label={''}
        name={name}
        rules={rules}
    >
        <label
            style={{ fontSize: '14px', color: '#646464' }}
            htmlFor="">{label}</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
            {
                value?.fileList?.map((itemMap) => <div className="relative">
                    <img className="relative"
                        style={{ width: '64px', height: '64px', borderRadius: '8px' }}
                        src={itemMap?.url} alt={itemMap?.url} />
                    <svg
                        onClick={() => {
                            const filterData = value?.fileList?.filter((itemFilter) => itemFilter?.uid !== itemMap?.uid)
                            form.setFieldValue(name, {
                                fileList: filterData
                            })
                        }}
                        style={{ position: 'absolute', right: '0px', top: '0px' }}
                        width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22.0337C17.5228 22.0337 22 17.5565 22 12.0337C22 6.51084 17.5228 2.03369 12 2.03369C6.47715 2.03369 2 6.51084 2 12.0337C2 17.5565 6.47715 22.0337 12 22.0337Z" fill="#DEE7FE" />
                        <path d="M13.0599 12.0337L15.3599 9.73368C15.6499 9.44368 15.6499 8.96368 15.3599 8.67368C15.0699 8.38368 14.5899 8.38368 14.2999 8.67368L11.9999 10.9737L9.69986 8.67368C9.40986 8.38368 8.92986 8.38368 8.63986 8.67368C8.34986 8.96368 8.34986 9.44368 8.63986 9.73368L10.9399 12.0337L8.63986 14.3337C8.34986 14.6237 8.34986 15.1037 8.63986 15.3937C8.78986 15.5437 8.97986 15.6137 9.16986 15.6137C9.35986 15.6137 9.54986 15.5437 9.69986 15.3937L11.9999 13.0937L14.2999 15.3937C14.4499 15.5437 14.6399 15.6137 14.8299 15.6137C15.0199 15.6137 15.2099 15.5437 15.3599 15.3937C15.6499 15.1037 15.6499 14.6237 15.3599 14.3337L13.0599 12.0337Z" fill="#2E2E2E" />
                    </svg>
                    {/* <img src={'https://df5tnwfq42mjn.cloudfront.net/upload/images/Add%20Button.png'} /> */}
                </div>)
            }
            <img
                onClick={() => handleInsertImage()}
                style={{
                    width: '68px',
                    height: '68px',
                    scale:'1.5'
                }}
                src={icon_add_image} alt='icon_add_image' />
        </div>
        <img
            style={{
                objectFit: 'none',
                scale:'1.05'
            }}
            onClick={() => handleInsertImage()}
            src={`https://df5tnwfq42mjn.cloudfront.net/upload/images/Add%20Button.png`} alt="image_upload1" />
        <UploadImage
            // name={name}
            className='custom-hidden-image'
            style={{ display: 'none' }}
            id={`upload-image-id-tmp-${name}`}
            defaultFileList={[]}
            onChangeFileList={onChangeFileList}
        >
            <div style={{ display: 'none' }}></div>
        </UploadImage>
    </Form.Item>
};

export default CustomUploadV2;