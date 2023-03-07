import React from 'react'
import styles from './Loading.module.css'

interface IProps {
  isLoading: boolean
}

const Loading: React.FC<IProps> = (props: IProps) => {
  if (!props.isLoading) return null
  return (
    <div className={styles.overlay}>
      <div className={styles.ldsRing}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Loading
