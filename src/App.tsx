import { ConfigProvider } from 'antd'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import BrowserRouter from './BrowserRouter'
import { globalThemeConfig } from './Layouts/ThemeProvider/theme'
import { ThemeProvider } from './Layouts/ThemeProvider/ThemeProvider'

const App: React.FC = () => {
  return (
    <ConfigProvider theme={globalThemeConfig}>
      <ThemeProvider>
        <QueryClientProvider client={new QueryClient()}>
          <BrowserRouter />
        </QueryClientProvider>
      </ThemeProvider>
    </ConfigProvider>
  )
}

export default App
