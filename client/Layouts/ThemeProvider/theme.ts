import { theme } from 'antd'
import type { ThemeConfig } from 'antd/es/config-provider/context'
import type { CSSProperties } from 'react'

export type TThemeColor = {
  solid: string
  background: string
  primary: string
  primaryOpacity: string
  secondary: string
  success: string
  warning: string
  error: string
  info: string
}

export const themeColorsLight: TThemeColor = {
  solid: '#ffffff',
  background: '#fafafa',
  primary: '#007fd0',
  primaryOpacity: '#daf1ff',
  secondary: '',
  success: '',
  warning: '',
  error: '',
  info: '',
}

export const themeColorsDark: TThemeColor = {
  solid: '#141414',
  background: '#1d1d1d',
  primary: '#007fd0',
  primaryOpacity: '#0b2740',
  secondary: '',
  success: '',
  warning: '',
  error: '',
  info: '',
}

export const iconActionTableStyle: CSSProperties = {
  color: themeColorsLight.primary,
}

export const sidebarThemeConfig = (isDarkMode: boolean): ThemeConfig => {
  return {
    components: {
      Menu: {
        colorItemText: '#777777',
        colorItemTextSelected: isDarkMode
          ? themeColorsLight.primary
          : themeColorsDark.primary,
        colorItemBgSelected: isDarkMode
          ? themeColorsDark.primaryOpacity
          : themeColorsLight.primaryOpacity,
        colorItemTextHover: isDarkMode
          ? themeColorsLight.primary
          : themeColorsLight.primary,
        colorItemBgHover: isDarkMode
          ? themeColorsDark.primaryOpacity
          : themeColorsLight.primaryOpacity,
        fontSize: 14,
        colorItemBg: isDarkMode
          ? themeColorsDark.solid
          : themeColorsLight.solid,
        colorSubItemBg: isDarkMode
          ? themeColorsDark.solid
          : themeColorsLight.solid,
      },
    },
  }
}

export const globalThemeConfig = (
  isDarkMode: boolean | undefined,
): ThemeConfig => {
  return {
    algorithm: theme.defaultAlgorithm,
    components: {
      Button: {
        colorPrimary: themeColorsLight.primary,
        colorPrimaryHover: themeColorsLight.primary,
      },
      Checkbox: {
        colorPrimary: themeColorsLight.primary,
        colorPrimaryHover: themeColorsLight.primary,
      },
      Table: {
        controlItemBgActive: isDarkMode
          ? themeColorsDark.primaryOpacity
          : themeColorsLight.primaryOpacity,
        controlItemBgActiveHover: isDarkMode
          ? themeColorsDark.primaryOpacity
          : themeColorsLight.primaryOpacity,
      },
      Steps: {
        colorPrimary: themeColorsLight.primary,
      },
      Tabs: {
        colorPrimary: themeColorsLight.primary,
      },
      Upload: {
        colorPrimary: themeColorsLight.primary,
      },
      Radio: {
        colorPrimary: themeColorsLight.primary,
      },
      Switch: {
        colorPrimary: themeColorsLight.primary,
      },
      Timeline: {
        colorPrimary: themeColorsLight.primary,
      },
    },
  }
}
