import { useMediaQuery } from 'react-responsive'

export const useIsMobileScreen = () => {
  return useMediaQuery({ query: '(max-width: 767px)' })
}
