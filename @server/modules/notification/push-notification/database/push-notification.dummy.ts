import { PushNotificationCreateRequest } from '../infrastructure/push-notification.request'

export const pushNotificationDummies: PushNotificationCreateRequest[] = [
  {
    title: 'Application has been deploy',
    message: 'This is very beginning of the application setup',
    pushAt: new Date(),
  },
  {
    title: 'Database has been reset',
    message: 'Database has been reset, get started',
    pushAt: new Date(),
  },
]
