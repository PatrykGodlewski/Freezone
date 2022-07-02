import { Context } from '@utils/Context';
import React, { useContext, useEffect, useState } from 'react';
import styles from '../../../styles/Switch.module.css';

const SwitchDarkMode = () => {
  const { enabled, setEnabled } = useContext(Context);
  const { shape, moon, sun, ray } = styles;
  const [shapeDM, setShapeDM] = useState(moon);

  useEffect(() => {
    if (enabled) setShapeDM(sun);
    if (!enabled) setShapeDM(moon);
  }, [enabled]);

  return (
    <button
      className={`${styles['theme-toggle--button']} bg-gray-800 dark:bg-gray-100 rounded p-4 shadow flex justify-center items-center ring-hover-effect`}
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
