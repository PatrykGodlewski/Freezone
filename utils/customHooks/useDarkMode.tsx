import { useEffect, useState } from 'react';

const useLocalStorage = (key: string, initialValue?: string) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
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

      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };
  return [storedValue, setValue];
};

const useDarkMode = () => {
  const [enabled, setEnabled] = useLocalStorage('dark-theme');
  const isEnabled = typeof enabledState === 'undefined' && enabled;

  useEffect(() => {
    const className = 'dark';
    const htmlTagClassList = window.document.documentElement.classList;

    isEnabled
      ? htmlTagClassList.add(className)
      : htmlTagClassList.remove(className);
  }, [enabled, isEnabled]);

  return [enabled, setEnabled];
};

export default useDarkMode;
