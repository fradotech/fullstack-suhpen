import { Col, Image } from 'antd'
import React from 'react'
import { host } from '../../../services/axios.service'

interface IProps {
  style?: React.CSSProperties
}

const CompanyLogo: React.FC<IProps> = (props: IProps) => (
  <Col
    style={{
      padding: '8px',
      textAlign: 'center',
    }}
  >
    <Image
      src={`${host}/images/company-logo.jpg`}
      preview={false}
      style={
        props.style || { width: '50%', maxWidth: '250px', borderRadius: '10px' }
      }
    />
  </Col>
)

export default CompanyLogo
