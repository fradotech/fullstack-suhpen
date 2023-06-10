import { useMediaQuery } from 'react-responsive'

export const isMobileScreen = () => {
  return useMediaQuery({ query: '(max-width: 767px)' })
}
