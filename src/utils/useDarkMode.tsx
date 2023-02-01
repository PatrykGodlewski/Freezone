import { useEffect, useState } from "react";

const useLocalStorage = (key: string, initialValue?: string) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (typeof window !== "undefined") {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      }
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: any) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };
  return [storedValue, setValue];
};

const useDarkMode = () => {
  const [isEnabled, setIsEnabled] = useLocalStorage("dark-theme");

  useEffect(() => {
    const className = "dark";
    const htmlTagClassList = window.document.documentElement.classList;

    isEnabled
      ? htmlTagClassList.add(className)
      : htmlTagClassList.remove(className);
  }, [isEnabled]);

  return [isEnabled, setIsEnabled];
};

export default useDarkMode;
