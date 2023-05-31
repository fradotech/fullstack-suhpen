import React from 'react'

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = React.useState<boolean>(
    localStorage.getItem('isDarkMode') == 'false' ? true : false,
  )

  const handleSwitchTheme = (isDarkMode: boolean) => {
    setIsDarkMode(!isDarkMode)
    localStorage.setItem('isDarkMode', isDarkMode ? 'true' : 'false')
  }

  return { isDarkMode, setIsDarkMode, handleSwitchTheme }
}

export default useDarkMode
