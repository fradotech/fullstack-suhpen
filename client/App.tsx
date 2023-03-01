import { ConfigProvider } from 'antd'
import React from 'react'
import BrowserRouter from './BrowserRouter'
import { globalThemeConfig } from './utils/theme'

const App: React.FC = () => {
  return (
    <ConfigProvider theme={globalThemeConfig}>
      <BrowserRouter />
    </ConfigProvider>
  )
}

export default App
