import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { IBaseEntity } from '@server/infrastructure/base/base-entity.interface'
import { Descriptions, Image } from 'antd'
import React from 'react'
import { Util } from '../../../utils/util'

const DescriptionItem = (data: IBaseEntity, key: string) => {
  if (
    key == 'avatar' ||
    key == 'image' ||
    key == 'thumbnail' ||
    key == 'attachment'
  ) {
    return (
      <Descriptions.Item label={Util.titleCase(key)}>
        <Image style={{ width: '50px' }} src={data[key]} />
      </Descriptions.Item>
    )
  } else if (data[key] == true || data[key] == false) {
    return (
      <Descriptions.Item label={Util.titleCase(key)}>
        {data[key] ? (
          <CheckCircleOutlined style={{ color: 'green' }} />
        ) : (
          <CloseCircleOutlined style={{ color: 'red' }} />
        )}
      </Descriptions.Item>
    )
  } else if (key.includes('At') || key.includes('Date')) {
    return (
      <Descriptions.Item label={Util.titleCase(key)}>
        {Util.formatDatetime(data[key]) != 'Invalid Date'
          ? Util.formatDatetime(data[key])
          : '-'}
      </Descriptions.Item>
    )
  } else {
    return (
      <Descriptions.Item label={Util.titleCase(key)}>
        {data[key] || '-'}
      </Descriptions.Item>
    )
  }
}

export default DescriptionItem
