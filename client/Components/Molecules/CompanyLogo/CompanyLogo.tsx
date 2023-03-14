import { Image } from 'antd'
import React from 'react'
import { Route } from '../../../Enums/Route'
import { host } from '../../../services/axios.service'

interface IProps {
  style?: React.CSSProperties
}

const CompanyLogo: React.FC<IProps> = (props: IProps) => (
  <a href={Route.Home}>
    <Image
      src={`${host}/images/company-logo.jpg`}
      preview={false}
      style={
        props.style || { width: '50%', maxWidth: '250px', borderRadius: '10px' }
      }
    />
  </a>
)

export default CompanyLogo
