/* eslint-disable @typescript-eslint/naming-convention */
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { port: +JSON.stringify(process.env.PORT_CLIENT) || 3001 },

  define: {
    'process.env.HOST': JSON.stringify(process.env.HOST),
    'process.env.PORT': JSON.stringify(process.env.PORT),
    'process.env.APP_PREFIX': JSON.stringify(process.env.APP_PREFIX),
    'process.env.BACKOFFICE_TOKEN': JSON.stringify(
      process.env.BACKOFFICE_TOKEN,
    ),
  },
})
