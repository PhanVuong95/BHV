import api from "zmp-sdk";

export const setStorage = async <T = any>(key: string, value: T) => {
  try {
    const { errorKeys } = await api.setStorage({
      data: {
        [key]: value,
      },
    });
  } catch (error) {
    // xử lý khi gọi api thất bại
    console.log(error);
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {}
  }
};

export const getStorage = async <T = any>(key: string): Promise<T | null> => {
  try {
    const result = await api.getStorage({
      keys: [key],
    });
    return result?.[key] as T;
  } catch (error) {
    // xử lý khi gọi api thất bại
    console.log(error);
    try {
      return JSON.parse(window.localStorage.getItem(key) as string);
    } catch (error) {
      return null;
    }
  }
};
export const deleteStorage = async <T = any>(key: string) => {
  const result = api.removeStorage({
    keys: [key],
    success: (data) => {
      return result?.[key] as T;
    },
    fail: (error) => {
      // xử lý khi gọi api thất bại
      console.log(error);
    }
    });
}