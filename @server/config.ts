import dotenv from 'dotenv'

dotenv.config()

const localhost = 'http://localhost'
const fradotech = 'fradotech'
const appLog = 'app.log'

export const config = {
  app: {
    name: process.env.APP_NAME,
    version: process.env.APP_VERSION,
    description: process.env.APP_DESCRIPTION,
    logFile: appLog,
    prefix: process.env.APP_PREFIX || '/api/v1',
  },

  server: {
    nodeEnv: process.env.NODE_ENV || 'local',
    port: process.env.PORT || 3000,
    host: process.env.HOST || localhost,
    hostPort: `${process.env.HOST || localhost}:${process.env.PORT || 3000}`,
    hostApi: `${`${process.env.HOST || localhost}:${
      process.env.PORT || 3000
    }`}${process.env.APP_PREFIX || '/api/v1'}`,

    hostClient: process.env.HOST_CLIENT || `${localhost}:8080`,
  },

  database: {
    dialect: process.env.DB_SERVER || 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE || fradotech,
  },

  auth: {
    expiresIn: +process.env.JWT_EXPIRES_IN_SECONDS || fradotech,
    jwt: {
      secretKey: process.env.JWT_SECRET_KEY || fradotech,
      expiredInseconds: process.env.JWT_EXPIRED_IN_SECONDS || 604800,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  smtp: {
    mailer: process.env.MAIL_MAILER || 'SMTP',
    host: process.env.MAIL_HOST || 'smtp.ethereal.email',
    port: process.env.MAIL_PORT || 587,
    username: process.env.MAIL_USERNAME,
    password: process.env.MAIL_PASSWORD,
    encryption: process.env.MAIL_ENCRYPTION || 'STARTTLS',
  },

  assets: {
    public: '/public',
    storage: process.env.ASSETS_STORAGE || '/public/uploads',
  },

  sentry: {
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
  },
}
