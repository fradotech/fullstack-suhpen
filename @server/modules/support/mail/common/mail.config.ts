import dotenv from 'dotenv'

dotenv.config()

export const MAIL_CONFIG = {
  mailer: process.env.MAIL_MAILER || 'SMTP',
  host: process.env.MAIL_HOST || 'smtp.ethereal.email',
  port: process.env.MAIL_PORT || 587,
  username: process.env.MAIL_USERNAME,
  password: process.env.MAIL_PASSWORD,
  encryption: process.env.MAIL_ENCRYPTION || 'STARTTLS',
}
