import { themeColors } from '../../../Layouts/ThemeProvider/theme'

export const getColorPicker = (color: any): string => {
  return color?.['hex'] || color || themeColors.primary
}
