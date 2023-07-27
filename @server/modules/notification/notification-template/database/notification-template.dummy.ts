import { NotificationCategoryDefaultKeyEnum } from '../../notification-category/common/notification-category.enum'
import { NotificationTemplateDefaultKeyEnum } from '../common/notification-template.enum'
import { NotificationTemplateCreateRequest } from '../v1/notification-template.request'

// <--- KEY: key --->
export const notificationTemplateDummies: NotificationTemplateCreateRequest[] =
  [
    {
      title: 'Successfull Register',
      key: NotificationTemplateDefaultKeyEnum.auth.Register,
      message: `Thanks {{userName}}! Thank you for filling out our sign up form. We are glad that you joined us.`,
      categoryKey: NotificationCategoryDefaultKeyEnum.Info,
    },
  ]
