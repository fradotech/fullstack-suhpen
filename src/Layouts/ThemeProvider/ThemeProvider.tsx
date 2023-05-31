import { ConfigProvider, theme } from 'antd'
import { ThemeConfig } from 'antd/es/config-provider/context'
import React, { createContext } from 'react'
import { globalThemeConfig } from './theme'
import useDarkMode from './useDarkMode'

export interface IThemeContext {
  isDarkMode: boolean
  handleSwitchTheme: (boolean: boolean) => void
}

interface IThemeProviderProps {
  children: React.ReactNode
}

export const ThemeContext = createContext<Partial<IThemeContext>>({})

export const ThemeProvider: React.FunctionComponent<IThemeProviderProps> = (
  props,
) => {
  const { isDarkMode, handleSwitchTheme } = useDarkMode()
  const { darkAlgorithm, defaultAlgorithm } = theme
  const themeAlgorithm = isDarkMode ? darkAlgorithm : defaultAlgorithm

  const tableComponentStyle = isDarkMode
    ? {
        controlItemBgActive: undefined,
        controlItemBgActiveHover: undefined,
      }
    : globalThemeConfig['components']['Table']

  const customThemeConfig: ThemeConfig = {
    ...globalThemeConfig,
    algorithm: themeAlgorithm,
    components: { Table: tableComponentStyle },
  }

  return (
    <ThemeContext.Provider {...props} value={{ isDarkMode, handleSwitchTheme }}>
      <ConfigProvider theme={customThemeConfig}>
        {props.children}
      </ConfigProvider>
    </ThemeContext.Provider>
  )
}
