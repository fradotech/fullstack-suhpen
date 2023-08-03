import { NotificationPushCreateRequest } from '../v1/notification-push.request'

export const notificationPushDummies: NotificationPushCreateRequest[] = [
  {
    title: 'Application Has Been Deployed',
    message: 'This is very beginning of the application setup',
    pushAt: new Date(),
  },
  {
    title: 'Database Has Been Reset',
    message: 'Database has been reset, get started',
    pushAt: new Date(),
  },
]
