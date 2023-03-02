import { Col, Image } from 'antd'
import React from 'react'

const CompanyLogo: React.FC = () => (
  <Col
    style={{
      padding: '8px',
      textAlign: 'center',
    }}
  >
    <Image
      src="https://avatars.githubusercontent.com/u/55073493?v=4"
      preview={false}
      style={{ width: '50%' }}
    />
  </Col>
)

export default CompanyLogo
