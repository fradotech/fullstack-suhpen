import dotenv from 'dotenv'

dotenv.config()

export const MAIL_CONFIG = {
  transport: {
    host: process.env.MAIL_HOST || 'smtp.ethereal.email',
    port: +(process.env.MAIL_PORT || 587),
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
    encryption: process.env.MAIL_ENCRYPTION || 'STARTTLS',
  },
  defaults: {
    from: process.env.MAIL_FROM,
  },
}
