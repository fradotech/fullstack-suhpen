import { SearchOutlined } from '@ant-design/icons'
import { Dropdown, Input } from 'antd'
import { ItemType } from 'antd/es/menu/hooks/useItems'
import React from 'react'
import { MenuItem, layoutItems } from './LayoutItems'

const LayoutSearch: React.FC = () => {
  const [value, setValue] = React.useState('')

  const itemsAll: MenuItem[] = React.useMemo(() => {
    const items: MenuItem[] = []

    const filterChildren = (menu: MenuItem[]): void => {
      menu.forEach((data) => {
        data.children ? filterChildren(data.children) : items.push(data)
      })
    }

    filterChildren(layoutItems)
    // CONTINUE: searcable menus

    return items
  }, [])

  const items: ItemType[] = React.useMemo(() => {
    const items = itemsAll.filter((data) => {
      const label = data.label?.['props']?.children.toLowerCase()
      return label.includes(value?.toLocaleLowerCase())
    })

    return items
  }, [value])

  return (
    <div style={{ marginRight: 12 }}>
      <Dropdown trigger={['click']} open={!!value} menu={{ items }}>
        <Input
          prefix={<SearchOutlined />}
          placeholder="Search for menus..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
          allowClear
        />
      </Dropdown>
    </div>
  )
}

export default LayoutSearch
