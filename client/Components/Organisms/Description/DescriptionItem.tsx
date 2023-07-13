import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { IBaseEntity } from '@server/infrastructure/base/base-entity.interface'
import { IBaseMasterData } from '@server/infrastructure/base/master-data/base-master-data.interface'
import { Descriptions, Image, Tag } from 'antd'
import { themeColors } from '../../../Layouts/ThemeProvider/theme'
import { Util } from '../../../common/utils/util'

const DescriptionItem = (data: IBaseEntity | undefined, key: string) => {
  if (!data) return null

  if (key.includes('Ids')) {
    return null
  } else if (['avatar', 'image', 'thumbnail', 'attachment'].includes(key)) {
    return (
      <Descriptions.Item key={key} label={Util.titleCase(key)}>
        <Image style={{ width: '50px' }} src={data[key]} />
      </Descriptions.Item>
    )
  } else if (data[key] === true || data[key] === false) {
    return (
      <Descriptions.Item key={key} label={Util.titleCase(key)}>
        {data[key] ? (
          <CheckCircleOutlined style={{ color: 'green' }} />
        ) : (
          <CloseCircleOutlined style={{ color: 'red' }} />
        )}
      </Descriptions.Item>
    )
  } else if (key.includes('At') || key.includes('Date')) {
    return (
      <Descriptions.Item key={key} label={Util.titleCase(key)}>
        {Util.formatDatetime(data[key])}
      </Descriptions.Item>
    )
  } else if (key.includes('Price')) {
    return (
      <Descriptions.Item key={key} label={Util.titleCase(key)}>
        {Util.formatCurrency(data[key])}
      </Descriptions.Item>
    )
  } else if (data[key]?.id && data[key]?.name) {
    return (
      <Descriptions.Item key={key} label={Util.titleCase(key)}>
        {data[key].name || '-'}
      </Descriptions.Item>
    )
  } else if (Array.isArray(data[key])) {
    return (
      <Descriptions.Item key={key} label={Util.titleCase(key)}>
        {data[key].map((data: IBaseMasterData) => {
          return (
            <Tag color={data.labelColor || themeColors.primary}>
              {data.name}
            </Tag>
          )
        })}
      </Descriptions.Item>
    )
  } else {
    return (
      <Descriptions.Item key={key} label={Util.titleCase(key)}>
        {data[key] || '-'}
      </Descriptions.Item>
    )
  }
}

export default DescriptionItem
