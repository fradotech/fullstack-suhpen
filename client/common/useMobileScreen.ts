import { useMediaQuery } from 'react-responsive'

export const useMobileScreen = () => {
  return { isMobile: useMediaQuery({ query: '(max-width: 767px)' }) }
}
