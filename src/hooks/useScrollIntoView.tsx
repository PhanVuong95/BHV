import { useEffect, useRef, useState } from "react";
import { useVirtualKeyboardVisible } from "./useVirtualKeyboardVisible";

const useScrollIntoView = (errorText?: string) => {
  const isVirtualKeyboardVisible = useVirtualKeyboardVisible();
  const [inputFocused, setInputFocused] = useState(false);
  const inputRef = useRef(null);

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleInputBlur = () => {
    setInputFocused(false);
  };

  useEffect(() => {
    try {
      if ((inputFocused || errorText) && inputRef.current) {
        (inputRef.current as any).input.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    } catch (error) {
      console.error(error);
    }
  }, [inputFocused, isVirtualKeyboardVisible, errorText]);
  return {
    handleInputBlur,
    handleInputFocus,
    inputRef,
  };
};

export default useScrollIntoView;
