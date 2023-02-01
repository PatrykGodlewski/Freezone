import styles from "@styles/Switch.module.css";
import useDarkMode from "@utils/useDarkMode";
import { useEffect, useState } from "react";

const SwitchDarkMode = ({ className }: { className: string }) => {
  const { shape, moon, sun, ray } = styles;
  const [enabled, setEnabled] = useDarkMode();
  const [shapeDM, setShapeDM] = useState(moon);

  useEffect(() => {
    setShapeDM(enabled ? sun : moon);
  }, [enabled, sun, moon]);

  return (
    <button
      className={`${styles["theme-toggle--button"]} ring-hover-effect flex items-center justify-center rounded bg-gray-800 p-4 shadow dark:bg-gray-100 ${className}`}
      onClick={() => setEnabled((prev: boolean) => !prev)}
    >
      <span className={`${shape} ${shapeDM} `}></span>
      <span className={styles[`rays--container`]}>
        <span className={ray}></span>
        <span className={ray}></span>
        <span className={ray}></span>
        <span className={ray}></span>
      </span>
    </button>
  );
};

export default SwitchDarkMode;
