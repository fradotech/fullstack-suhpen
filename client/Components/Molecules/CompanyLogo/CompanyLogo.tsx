import { Col, Image } from 'antd'
import React from 'react'
import { host } from '../../../services/axios.service'

const CompanyLogo: React.FC = () => (
  <Col
    style={{
      padding: '8px',
      textAlign: 'center',
    }}
  >
    <Image
      src={`${host}/images/company-logo.jpg`}
      preview={false}
      style={{ width: '50%' }}
    />
  </Col>
)

export default CompanyLogo
