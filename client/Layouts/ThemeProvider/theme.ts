import { theme } from 'antd'
import type { ThemeConfig } from 'antd/es/config-provider/context'
import type { CSSProperties } from 'react'

export const themeColors = {
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

export const themeColorsDark = {
  solid: '#141414',
  background: '#1d1d1d',
  primary: '#007fd0',
  primaryOpacity: '#daf1ff',
  secondary: '',
  success: '',
  warning: '',
  error: '',
  info: '',
}

export const iconActionTableStyle: CSSProperties = {
  color: themeColors.primary,
}

export const sidebarThemeConfig = (isDarkMode: boolean): ThemeConfig => {
  return {
    components: {
      Menu: {
        colorItemText: '#777777',
        colorItemTextSelected: isDarkMode
          ? themeColors.solid
          : themeColorsDark.primary,
        colorItemBgSelected: isDarkMode
          ? themeColorsDark.primary
          : themeColors.primaryOpacity,
        colorItemTextHover: isDarkMode
          ? themeColors.solid
          : themeColors.primary,
        colorItemBgHover: isDarkMode
          ? themeColorsDark.primary
          : themeColors.primaryOpacity,
        fontSize: 14,
        colorItemBg: isDarkMode ? themeColorsDark.solid : themeColors.solid,
        colorSubItemBg: isDarkMode ? themeColorsDark.solid : themeColors.solid,
      },
    },
  }
}

export const globalThemeConfig: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  components: {
    Button: {
      colorPrimary: themeColors.primary,
      colorPrimaryHover: themeColors.primary,
    },
    Checkbox: {
      colorPrimary: themeColors.primary,
      colorPrimaryHover: themeColors.primary,
    },
    Table: {
      controlItemBgActive: '#eeeeee',
      controlItemBgActiveHover: '#eeeeee',
    },
    Steps: {
      colorPrimary: themeColors.primary,
    },
    Tabs: {
      colorPrimary: themeColors.primary,
    },
    Upload: {
      colorPrimary: themeColors.primary,
    },
    Radio: {
      colorPrimary: themeColors.primary,
    },
    Switch: {
      colorPrimary: themeColors.primary,
    },
    Timeline: {
      colorPrimary: themeColors.primary,
    },
  },
}
