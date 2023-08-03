import { ConfigProvider, theme } from 'antd'
import { ThemeConfig } from 'antd/es/config-provider/context'
import React, { createContext } from 'react'
import {
  TThemeColor,
  globalThemeConfig,
  themeColorsDark,
  themeColorsLight,
} from './theme'
import useDarkMode from './useDarkMode'

export interface IThemeContext {
  isDarkMode: boolean
  handleSwitchTheme: (boolean: boolean) => void
  themeColors: TThemeColor
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
  const themeColors = isDarkMode ? themeColorsDark : themeColorsLight

  const customThemeConfig: ThemeConfig = {
    ...globalThemeConfig(isDarkMode),
    algorithm: themeAlgorithm,
  }

  return (
    <ThemeContext.Provider
      {...props}
      value={{ isDarkMode, themeColors, handleSwitchTheme }}
    >
      <ConfigProvider theme={customThemeConfig}>
        {props.children}
      </ConfigProvider>
    </ThemeContext.Provider>
  )
}
