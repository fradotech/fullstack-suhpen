import React from 'react'
import styles from './LoaderPage.module.css'

const LoaderPage: React.FC = () => {
  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.lds_ring}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  )
}

export default LoaderPage
