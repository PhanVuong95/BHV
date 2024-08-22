import { useState } from "react";
import config from "../contants/config";
import { createSignLoginPortal } from "../services/user";
import { openUrlInWebview } from "../services/zalo";

const useLoginPortal = () => {
  const [loading, setloading] = useState(false);
  const handleOpenPortal = async () => {
    try {
      if (loading) return;
      setloading(true);
      const { signedStr } = await createSignLoginPortal();
      const url = `${config.VITE_PORTAL_HOST}/s?s=${signedStr}`;
      console.log("portal url", url);
      openUrlInWebview(url);
    } catch (error) {
      console.error(error);
      openUrlInWebview(config.VITE_PORTAL_HOST);
    } finally {
      setloading(false);
    }
  };

  return {
    handleOpenPortal,
    loading,
  };
};

export default useLoginPortal;
