import * as Sentry from '@sentry/react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const sentryDsn = undefined
;('https://2777883bd089467c8edf2be21cc594ef@o4504796336619520.ingest.sentry.io/4504796343107584')

Sentry.init({
  dsn: sentryDsn,
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
)
