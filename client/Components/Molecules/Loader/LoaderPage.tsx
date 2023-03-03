import React, { useEffect } from 'react'
import Style from './LoaderPage.module.css'

const LoaderPage: React.FC = () => {
  return (
    <div className={Style.lds_ring}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default LoaderPage
