import { NotificationCategoryDefaultKeyEnum } from '../../notification-category/common/notification-category.enum'
import { NotificationTemplateCreateRequest } from '../v1/notification-template.request'

// <--- KEY: key --->
export const notificationTemplateDummies: NotificationTemplateCreateRequest[] =
  [
    {
      title: 'Successfull Register',
      message: `Thanks {{customerName}}! Thank you for filling out our sign up form. We are glad that you joined us.`,
      categoryId: NotificationCategoryDefaultKeyEnum.Info,
    },
  ]
