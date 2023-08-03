import { ConfigProvider } from 'antd'
import React, { useContext } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import BrowserRouter from './BrowserRouter'
import {
  ThemeContext,
  ThemeProvider,
} from './Layouts/ThemeProvider/ThemeProvider'
import { globalThemeConfig } from './Layouts/ThemeProvider/theme'

const App: React.FC = () => {
  const { isDarkMode } = useContext(ThemeContext)

  return (
    <ConfigProvider theme={globalThemeConfig(isDarkMode)}>
      <ThemeProvider>
        <QueryClientProvider client={new QueryClient()}>
          <BrowserRouter />
        </QueryClientProvider>
      </ThemeProvider>
    </ConfigProvider>
  )
}

export default App
