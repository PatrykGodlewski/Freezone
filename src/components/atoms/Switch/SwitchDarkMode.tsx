import React, { useEffect, useState } from 'react';
import styles from '../../../styles/Switch.module.css';
import useDarkMode from '@utils/customHooks/useDarkMode';

const SwitchDarkMode = ({ className }: { className: string }) => {
  const { shape, moon, sun, ray } = styles;
  const [enabled, setEnabled] = useDarkMode();
  const [shapeDM, setShapeDM] = useState(moon);

  useEffect(() => {
    setShapeDM(enabled ? sun : moon);
  }, [enabled, sun, moon]);

  return (
    <button
      className={`${styles['theme-toggle--button']} bg-gray-800 dark:bg-gray-100 rounded p-4 shadow flex justify-center items-center ring-hover-effect ${className}`}
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
