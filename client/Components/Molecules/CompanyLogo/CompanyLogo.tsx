import { Image } from 'antd'
import React from 'react'

type IProps = {
  style?: React.CSSProperties
  className?: string
}

const CompanyLogo: React.FC<IProps> = (props: IProps) => (
  <div className={props.className}>
    <Image
      src="/images/company-logo.jpg"
      preview={false}
      style={
        props.style || { width: '50%', maxWidth: '250px', borderRadius: '10px' }
      }
    />
  </div>
)

export default CompanyLogo
