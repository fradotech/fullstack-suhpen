import { Col, ConfigProvider, Menu } from 'antd'
import React from 'react'
import { sidebarThemeConfig } from '../../utils/theme'
import { layoutItems } from './LayoutItems'
import styles from './LayoutMain.module.css'

const LayoutSidebar: React.FC = () => {
  const activeMenuKey = React.useMemo(
    () => window.location.pathname,
    [window.location.pathname],
  )

  const defaultOpenedKey = React.useMemo(
    () =>
      layoutItems.find((item) => {
        if ('children' in item) {
          const openedMenuItem = item.children?.find((chil) => {
            return chil.key === activeMenuKey
          })
          return openedMenuItem !== undefined
        }
        return null
      })?.key as string,
    [layoutItems, activeMenuKey],
  )

  return (
    <>
      <ConfigProvider theme={sidebarThemeConfig}>
        <Col className={styles.sidebar}>
          <Menu
            mode="inline"
            items={layoutItems}
            defaultOpenKeys={[defaultOpenedKey]}
            selectedKeys={[activeMenuKey]}
          />
        </Col>
      </ConfigProvider>
    </>
  )
}

export default LayoutSidebar
