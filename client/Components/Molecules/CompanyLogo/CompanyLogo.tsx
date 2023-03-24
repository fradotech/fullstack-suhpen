import { Image } from 'antd'
import React from 'react'
import { host } from '../../../services/axios.service'

interface IProps {
  style?: React.CSSProperties
  className?: string
}

const CompanyLogo: React.FC<IProps> = (props: IProps) => (
  <div className={props.className}>
    <Image
      src={`${host}/images/company-logo.jpg`}
      preview={false}
      style={
        props.style || { width: '50%', maxWidth: '250px', borderRadius: '10px' }
      }
    />
  </div>
)

export default CompanyLogo
