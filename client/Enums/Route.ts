import { routesDashboard } from '../Modules/Dashboard/Dashboard.route'
import { routesAccount } from '../Modules/Iam/Account/Account.route'
import { routesAuth } from '../Modules/Iam/Auth/Auth.route'
import { routesRole } from '../Modules/Iam/Role/Role.route'
import { routesUser } from '../Modules/Iam/User/User.route'

export const Route = {
  Home: '/',
  Attachment: '/attachments',

  ...routesDashboard,
  ...routesAuth,
  ...routesAccount,
  ...routesUser,
  ...routesRole,

  // <--- Feature --->
}
