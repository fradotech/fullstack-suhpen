import { Spin } from 'antd'
import React from 'react'
import styles from './PageProgress.module.css'

export const PageProgress = () => {
  return (
    <>
      <div className={styles.blurLayoutStyle}></div>
      <div className={styles.spinnerContainer}>
        <Spin size="large" />
      </div>
    </>
  )
}
