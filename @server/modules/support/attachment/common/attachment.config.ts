import dotenv from 'dotenv'

dotenv.config()

export const ATTACHMENT_CONFIG = {
  public: '/public',
  storage: process.env.ASSETS_STORAGE || '/public/uploads',
}
