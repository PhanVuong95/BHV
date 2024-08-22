// import { Upload, UploadFile, UploadProps } from "antd";
import { Upload, UploadFile, UploadProps } from "antd";
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { getS3ImageUrl } from "../../../helpers/s3";
import { useLazyGetSingedUploadImageUrlQuery } from "../../../services/user";

type Props = PropsWithChildren<
  {
    onUpLoading?: () => void;
    onSuccessUpload?: (data: { origin: string }) => void;
    onChangeFileList?: (data: any) => void;
  } & UploadProps
>;

const UploadImage = ({
  onUpLoading,
  onSuccessUpload,
  onChangeFileList,
  ...props
}: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [fileList, setFileList] = useState<UploadFile[]>(props?.fileList || []);

  const getSignedUrl = async ({fileName})=>{
    return await useLazyGetSingedUploadImageUrlQuery(fileName);
  }
  const handleOnChange = ({ file, fileList, event }: any) => {
    onChangeFileList?.(fileList);
  };
  const handleCustomUploadImage = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async ({ file, onSuccess, onProgress}: Record<string, any>) => {
      const fileName = file.name;
      const { url}  = await getSignedUrl({ fileName });
      
      onProgress({ percent: 10 });

      const signedUrl = url || "";
      // console.log(signedUrl);
      await fetch(decodeURIComponent(signedUrl), {
        method: "PUT",
        body: file,
      });
      onProgress({ percent: 50 });
      onSuccessUpload?.({
        origin: getS3ImageUrl(fileName),
      });
      onSuccess(getS3ImageUrl(fileName));
    },
    [onUpLoading, onSuccessUpload, getSignedUrl]
  );


  return (
    <>
      <Upload
        listType="picture-card"
        onChange={handleOnChange}
        customRequest={handleCustomUploadImage}
        // showUploadList={true}
        accept="image/*"
        {...props}
      />
    </>
  );
};

export default UploadImage;
