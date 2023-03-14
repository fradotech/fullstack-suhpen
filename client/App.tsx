import { ConfigProvider } from 'antd'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import BrowserRouter from './BrowserRouter'
import { globalThemeConfig } from './utils/theme'

const App: React.FC = () => {
  return (
    <ConfigProvider theme={globalThemeConfig}>
      <QueryClientProvider client={new QueryClient()}>
        <BrowserRouter />
      </QueryClientProvider>
    </ConfigProvider>
  )
}

export default App
